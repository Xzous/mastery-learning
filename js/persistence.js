// ============================================================
// persistence.js — localStorage wrapper with versioning
// ============================================================
window.Persistence = (() => {
  const STORAGE_KEY = 'mastery_learning_v1';
  const VERSION = 1;

  function _getStore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return _defaultStore();
      const store = JSON.parse(raw);
      if (store.version !== VERSION) return _migrate(store);
      return store;
    } catch (e) {
      console.warn('Persistence: failed to load, resetting', e);
      return _defaultStore();
    }
  }

  function _defaultStore() {
    return {
      version: VERSION,
      cards: {},         // cardId -> { interval, repetitions, easeFactor, dueDate, mistakes, lastReview }
      proofs: {},        // proofId -> { completedSteps: [], attempts: {}, mistakes: {} }
      mastery: {},       // "courseId:topicId:defId" -> { level: 0-100, reviews: 0 }
      errors: {},        // "courseId:topicId" -> { omission: 0, partial: 0, logical-leap: 0, minor: 0 }
      unlocked: {},      // "courseId:topicId" -> true/false
      settings: {}
    };
  }

  function _migrate(store) {
    // Future migration logic
    return _defaultStore();
  }

  function _save(store) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
      console.error('Persistence: failed to save', e);
    }
  }

  // ---- Card State (Spaced Repetition) ----

  function getCardState(cardId) {
    const store = _getStore();
    return store.cards[cardId] || null;
  }

  function setCardState(cardId, state) {
    const store = _getStore();
    store.cards[cardId] = state;
    _save(store);
  }

  function getAllCards() {
    const store = _getStore();
    return store.cards;
  }

  // ---- Proof Progress ----

  function getProofProgress(proofId) {
    const store = _getStore();
    return store.proofs[proofId] || { completedSteps: [], attempts: {}, mistakes: {} };
  }

  function setProofProgress(proofId, progress) {
    const store = _getStore();
    store.proofs[proofId] = progress;
    _save(store);
  }

  function markProofStepComplete(proofId, stepIndex) {
    const store = _getStore();
    if (!store.proofs[proofId]) {
      store.proofs[proofId] = { completedSteps: [], attempts: {}, mistakes: {} };
    }
    if (!store.proofs[proofId].completedSteps.includes(stepIndex)) {
      store.proofs[proofId].completedSteps.push(stepIndex);
    }
    _save(store);
  }

  function recordProofAttempt(proofId, stepIndex) {
    const store = _getStore();
    if (!store.proofs[proofId]) {
      store.proofs[proofId] = { completedSteps: [], attempts: {}, mistakes: {} };
    }
    const key = String(stepIndex);
    store.proofs[proofId].attempts[key] = (store.proofs[proofId].attempts[key] || 0) + 1;
    _save(store);
    return store.proofs[proofId].attempts[key];
  }

  function recordProofMistake(proofId, stepIndex, mistakeType) {
    const store = _getStore();
    if (!store.proofs[proofId]) {
      store.proofs[proofId] = { completedSteps: [], attempts: {}, mistakes: {} };
    }
    const key = String(stepIndex);
    if (!store.proofs[proofId].mistakes[key]) {
      store.proofs[proofId].mistakes[key] = [];
    }
    store.proofs[proofId].mistakes[key].push({ type: mistakeType, time: Date.now() });
    _save(store);
  }

  function isProofComplete(proofId, totalSteps) {
    const progress = getProofProgress(proofId);
    return progress.completedSteps.length >= totalSteps;
  }

  // ---- Definition Mastery ----

  function getMasteryKey(courseId, defId) {
    return `${courseId}:${defId}`;
  }

  function getDefinitionMastery(courseId, defId) {
    const store = _getStore();
    const key = getMasteryKey(courseId, defId);
    return store.mastery[key] || { level: 0, reviews: 0 };
  }

  function updateDefinitionMastery(courseId, defId, score) {
    const store = _getStore();
    const key = getMasteryKey(courseId, defId);
    const current = store.mastery[key] || { level: 0, reviews: 0 };

    // Weighted moving average: new mastery = 0.7 * old + 0.3 * score
    current.level = Math.round(current.level * 0.7 + score * 100 * 0.3);
    current.level = Math.max(0, Math.min(100, current.level));
    current.reviews++;

    store.mastery[key] = current;
    _save(store);
    return current;
  }

  function getTopicDefinitionMastery(courseId, topicId) {
    const topic = ContentRegistry.getTopic(courseId, topicId);
    if (!topic || !topic.definitions || topic.definitions.length === 0) return 100;

    let total = 0;
    for (const def of topic.definitions) {
      const m = getDefinitionMastery(courseId, def.id);
      total += m.level;
    }
    return Math.round(total / topic.definitions.length);
  }

  // ---- Error Heatmap ----

  function getErrorKey(courseId, topicId) {
    return `${courseId}:${topicId}`;
  }

  function recordError(courseId, topicId, mistakeType) {
    const store = _getStore();
    const key = getErrorKey(courseId, topicId);
    if (!store.errors[key]) {
      store.errors[key] = { omission: 0, partial: 0, 'logical-leap': 0, minor: 0 };
    }
    if (store.errors[key][mistakeType] !== undefined) {
      store.errors[key][mistakeType]++;
    }
    _save(store);
  }

  function getErrorHeatmap() {
    const store = _getStore();
    return store.errors;
  }

  function getTopicErrors(courseId, topicId) {
    const store = _getStore();
    const key = getErrorKey(courseId, topicId);
    return store.errors[key] || { omission: 0, partial: 0, 'logical-leap': 0, minor: 0 };
  }

  // ---- Topic Unlocking ----

  function isTopicUnlocked(courseId, topicId) {
    const topic = ContentRegistry.getTopic(courseId, topicId);
    if (!topic) return false;

    // First topic is always unlocked
    if (!topic.prerequisites || topic.prerequisites.length === 0) return true;

    // Check all prerequisites
    return topic.prerequisites.every(prereqId => {
      const mastery = getTopicDefinitionMastery(courseId, prereqId);
      return mastery >= 60; // Need 60% mastery on prereq definitions
    });
  }

  function getTopicStatus(courseId, topicId) {
    if (!isTopicUnlocked(courseId, topicId)) return 'locked';

    const mastery = getTopicDefinitionMastery(courseId, topicId);
    const topic = ContentRegistry.getTopic(courseId, topicId);

    // Check proof completion
    let proofsComplete = 0;
    if (topic && topic.proofs) {
      for (const proof of topic.proofs) {
        if (isProofComplete(proof.id, proof.steps.length)) proofsComplete++;
      }
    }

    if (mastery >= 80 && topic && topic.proofs && proofsComplete === topic.proofs.length) {
      return 'mastered';
    }
    if (mastery > 0 || proofsComplete > 0) return 'in-progress';
    return 'available';
  }

  // ---- Reset ----

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
  }

  return {
    getCardState,
    setCardState,
    getAllCards,
    getProofProgress,
    setProofProgress,
    markProofStepComplete,
    recordProofAttempt,
    recordProofMistake,
    isProofComplete,
    getDefinitionMastery,
    updateDefinitionMastery,
    getTopicDefinitionMastery,
    recordError,
    getErrorHeatmap,
    getTopicErrors,
    isTopicUnlocked,
    getTopicStatus,
    reset
  };
})();
