// ============================================================
// spaced-repetition.js — Modified SM-2 spaced repetition scheduler
// ============================================================
window.SpacedRepetition = (() => {
  // SM-2 defaults
  const DEFAULT_EASE = 2.5;
  const MIN_EASE = 1.3;
  const INITIAL_INTERVAL = 1;  // 1 day

  // Penalty multipliers by mistake type (higher = harsher penalty)
  const MISTAKE_PENALTIES = {
    'omission': 0.6,      // Forgot entire parts — heavy penalty
    'logical-leap': 0.75, // Skipped logical steps
    'partial': 0.85,      // Partially correct
    'minor': 0.95         // Small mistakes
  };

  /**
   * Generate spaced repetition cards for all definitions in a course.
   * One card per atomic definition part + one per axiom.
   */
  function generateCards(courseId) {
    const cards = [];
    const definitions = ContentRegistry.getAllDefinitions(courseId);

    for (const def of definitions) {
      // One card per atomic part
      for (const part of (def.atomicParts || [])) {
        cards.push({
          id: `${courseId}:${def.id}:${part.id}`,
          type: 'atomic-part',
          courseId,
          definitionId: def.id,
          definitionName: def.name,
          partId: part.id,
          prompt: `What is this part of the definition of "${def.name}"?`,
          reference: part.text,
          keywords: part.keywords
        });
      }

      // One card per axiom
      for (const axiom of (def.axioms || [])) {
        cards.push({
          id: `${courseId}:${def.id}:${axiom.id}`,
          type: 'axiom',
          courseId,
          definitionId: def.id,
          definitionName: def.name,
          axiomId: axiom.id,
          prompt: `State the "${axiom.label}" axiom for ${def.name}.`,
          reference: axiom.statement,
          keywords: Utils.tokenize(axiom.statement).filter(w => !Utils.STOPWORDS.has(w)).slice(0, 6)
        });
      }
    }

    return cards;
  }

  /**
   * Initialize a card's spaced repetition state if not already tracked.
   */
  function _initCard(cardId) {
    let state = Persistence.getCardState(cardId);
    if (!state) {
      state = {
        interval: 0,           // days until next review (0 = new)
        repetitions: 0,
        easeFactor: DEFAULT_EASE,
        dueDate: Date.now(),   // due immediately
        lastReview: null,
        mistakes: []           // { type, time }
      };
      Persistence.setCardState(cardId, state);
    }
    return state;
  }

  /**
   * Review a card with a quality rating (0-5 SM-2 scale) and optional mistake type.
   * quality: 0 = complete blackout, 1 = wrong, 2 = wrong but remembered after hint,
   *          3 = correct with difficulty, 4 = correct, 5 = perfect
   */
  function reviewCard(cardId, quality, mistakeType) {
    const state = _initCard(cardId);
    const now = Date.now();

    // Record mistake if applicable
    if (quality < 3 && mistakeType) {
      state.mistakes.push({ type: mistakeType, time: now });
    }

    // SM-2 algorithm with modifications
    if (quality >= 3) {
      // Correct response
      if (state.repetitions === 0) {
        state.interval = INITIAL_INTERVAL;
      } else if (state.repetitions === 1) {
        state.interval = 6;
      } else {
        state.interval = Math.round(state.interval * state.easeFactor);
      }
      state.repetitions++;
    } else {
      // Incorrect — reset
      state.repetitions = 0;
      state.interval = INITIAL_INTERVAL;

      // Apply mistake-type penalty to ease factor
      if (mistakeType && MISTAKE_PENALTIES[mistakeType]) {
        state.easeFactor *= MISTAKE_PENALTIES[mistakeType];
      }
    }

    // Update ease factor (standard SM-2 formula)
    state.easeFactor = state.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    state.easeFactor = Math.max(MIN_EASE, state.easeFactor);

    // Set next due date
    state.dueDate = now + state.interval * 24 * 60 * 60 * 1000;
    state.lastReview = now;

    Persistence.setCardState(cardId, state);
    return state;
  }

  /**
   * Get priority score for a card (higher = should review sooner).
   */
  function getCardPriority(cardId) {
    const state = _initCard(cardId);
    const now = Date.now();
    let priority = 0;

    // Overdue bonus
    const overdueDays = (now - state.dueDate) / (24 * 60 * 60 * 1000);
    if (overdueDays > 0) {
      priority += overdueDays * 10;
    }

    // Low ease factor bonus
    priority += (DEFAULT_EASE - state.easeFactor) * 5;

    // Recent mistakes bonus
    const recentMistakes = state.mistakes.filter(m => now - m.time < 7 * 24 * 60 * 60 * 1000);
    priority += recentMistakes.length * 3;

    // Omission mistakes are extra priority
    const omissions = recentMistakes.filter(m => m.type === 'omission');
    priority += omissions.length * 5;

    // New cards (never reviewed) get moderate priority
    if (state.repetitions === 0 && !state.lastReview) {
      priority += 5;
    }

    return priority;
  }

  /**
   * Get all due cards across all courses, sorted by priority.
   */
  function getDueCards(limit) {
    const allCards = [];
    const courses = ContentRegistry.getAllCourses();

    for (const course of courses) {
      const cards = generateCards(course.id);
      for (const card of cards) {
        const state = _initCard(card.id);
        const now = Date.now();
        // Include if due or new
        if (state.dueDate <= now || (!state.lastReview && state.repetitions === 0)) {
          // Check if topic is unlocked
          const def = ContentRegistry.getDefinition(course.id, card.definitionId);
          if (def && Persistence.isTopicUnlocked(course.id, def._topicId)) {
            allCards.push({
              ...card,
              state,
              priority: getCardPriority(card.id)
            });
          }
        }
      }
    }

    // Sort by priority (highest first)
    allCards.sort((a, b) => b.priority - a.priority);

    return limit ? allCards.slice(0, limit) : allCards;
  }

  /**
   * Get review session: limited set of due cards.
   */
  function getReviewSession(limit = 20) {
    return getDueCards(limit);
  }

  /**
   * Get count of due cards.
   */
  function getDueCount() {
    return getDueCards().length;
  }

  /**
   * Convert quality from score (0-1) to SM-2 quality (0-5).
   */
  function scoreToQuality(score) {
    if (score >= 0.9) return 5;
    if (score >= 0.75) return 4;
    if (score >= 0.6) return 3;
    if (score >= 0.4) return 2;
    if (score >= 0.2) return 1;
    return 0;
  }

  return {
    generateCards,
    reviewCard,
    getCardPriority,
    getDueCards,
    getReviewSession,
    getDueCount,
    scoreToQuality
  };
})();
