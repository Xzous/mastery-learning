// ============================================================
// definition-engine.js — Duolingo-style TEACH → TEST lesson flow
// ============================================================
window.DefinitionEngine = (() => {

  /**
   * Build a lesson as an ordered array of steps.
   * Phase 1 (teach): explanation slides shown before any questions.
   * Phase 2 (test): multiple-choice questions.
   */
  function _generateLesson(definition) {
    const steps = [];

    // PHASE 1: TEACH — one step per explanation slide
    for (const slide of (definition.explanations || [])) {
      steps.push({
        phase: 'teach',
        type: slide.type || 'concept',
        title: slide.title,
        body: slide.body,
        example: slide.example || null,
        formula: slide.formula || null,
        keyTerms: slide.keyTerms || [],
        vizScene: slide.vizScene || null,
        vizConfig: slide.vizConfig || null
      });
    }

    // PHASE 2: TEST — one step per MC exercise (shuffled order)
    const exercises = (definition.exercises || []).filter(ex => ex.choices && ex.choices.length > 0);
    _shuffleArray(exercises);
    for (const ex of exercises) {
      steps.push({
        phase: 'test',
        prompt: ex.prompt,
        choices: ex.choices,
        correctIndex: ex.correctIndex,
        explanation: ex.explanation || ''
      });
    }

    return steps;
  }

  // ==================== LESSON RENDERER ====================

  function renderLesson(container, courseId, definition) {
    const steps = _generateLesson(definition);
    let idx = 0;
    let correctCount = 0;
    let _activeTeachViz = null;
    const totalTestQuestions = steps.filter(s => s.phase === 'test').length;

    function _disposeViz() {
      if (_activeTeachViz) {
        _activeTeachViz.dispose();
        _activeTeachViz = null;
      }
    }

    function showStep() {
      _disposeViz();

      if (idx >= steps.length) {
        _showLessonComplete(container, courseId, definition, correctCount, totalTestQuestions);
        return;
      }

      const step = steps[idx];
      const pct = Math.round((idx / steps.length) * 100);

      if (step.phase === 'teach') {
        _renderTeachSlide(container, courseId, definition, step, idx, steps.length, pct, () => {
          idx++;
          showStep();
        }, (vizHandle) => { _activeTeachViz = vizHandle; });
      } else {
        _renderTestQuestion(container, courseId, definition, step, idx, steps.length, pct, (wasCorrect) => {
          if (wasCorrect) correctCount++;
          idx++;
          showStep();
        });
      }
    }

    showStep();

    // Return cleanup for router to call on navigation
    return _disposeViz;
  }

  // ==================== TEACH SLIDE ====================

  function _renderTeachSlide(container, courseId, definition, step, idx, total, pct, onNext, onVizMount) {
    const cardClass = step.type === 'intro' ? 'intro' :
                      step.type === 'axiom' ? 'axiom' :
                      step.vizScene ? 'visual' : '';
    const labelText = step.type === 'intro' ? 'Introduction' :
                      step.type === 'axiom' ? 'Key Rule' :
                      step.type === 'example' ? 'Example' :
                      step.vizScene ? 'Visualization' : 'Concept';

    // Highlight key terms in the body
    let bodyHtml = _esc(step.body);
    for (const term of step.keyTerms) {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp('(' + escaped + ')', 'gi');
      bodyHtml = bodyHtml.replace(regex, '<span class="explain-key">$1</span>');
    }

    container.innerHTML = `
      <div class="animate-slide-up">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
          <a href="#${definition._backRoute || 'topic/' + courseId + '/' + definition._topicId}" class="back-btn" style="text-decoration:none;">
            <span class="arrow">&#10005;</span>
          </a>
          <div class="lesson-progress" style="flex:1;max-width:none;">
            <div class="lesson-progress-fill" style="width:${pct}%"></div>
          </div>
          <span style="font-size:14px;font-weight:700;color:var(--text-secondary);">${idx + 1}/${total}</span>
        </div>
      </div>
      <div class="slide-counter">${_esc(definition.name)}</div>
      <div class="explain-card ${cardClass} animate-slide-up" style="animation-delay:0.05s;">
        <div class="explain-label">${_esc(labelText)}</div>
        <div class="explain-title">${_esc(step.title)}</div>
        <div class="explain-body">${bodyHtml}</div>
        ${step.formula ? '<div class="explain-formula">' + _esc(step.formula) + '</div>' : ''}
        ${step.example ? '<div class="explain-example">' + _esc(step.example).replace(/\n/g, '<br>') + '</div>' : ''}
        ${step.vizScene ? '<div class="teach-viz-container" id="teach-viz-mount"></div><div class="teach-viz-hint">Drag to pan &middot; Scroll to zoom</div>' : ''}
      </div>
    `;

    _renderMath(container);

    // Mount 3D scene if this slide has one
    if (step.vizScene && typeof TeachViz !== 'undefined') {
      setTimeout(() => {
        const handle = TeachViz.mount('teach-viz-mount', step.vizScene, step.vizConfig);
        if (handle && onVizMount) onVizMount(handle);
      }, 50);
    }

    Dashboard._setActionBar(`
      <button class="btn btn-check" id="teach-next">Continue</button>
    `);

    document.getElementById('teach-next').addEventListener('click', onNext);
  }

  // ==================== MC TEST QUESTION ====================

  function _renderTestQuestion(container, courseId, definition, step, idx, total, pct, onNext) {
    // Shuffle choices while tracking the correct answer
    const shuffled = step.choices.map((text, origIdx) => ({ text, origIdx }));
    _shuffleArray(shuffled);
    const shuffledCorrectIdx = shuffled.findIndex(c => c.origIdx === step.correctIndex);

    container.innerHTML = `
      <div class="animate-slide-up">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
          <a href="#${definition._backRoute || 'topic/' + courseId + '/' + definition._topicId}" class="back-btn" style="text-decoration:none;">
            <span class="arrow">&#10005;</span>
          </a>
          <div class="lesson-progress" style="flex:1;max-width:none;">
            <div class="lesson-progress-fill" style="width:${pct}%"></div>
          </div>
          <span style="font-size:14px;font-weight:700;color:var(--text-secondary);">${idx + 1}/${total}</span>
        </div>
      </div>
      <div class="lesson-card animate-slide-up" style="animation-delay:0.05s;">
        <div class="lesson-prompt">${_esc(step.prompt)}</div>
        <div class="mc-choices" id="mc-choices">
          ${shuffled.map((c, i) => `
            <button class="mc-tile" data-index="${i}">
              <span class="mc-letter">${String.fromCharCode(65 + i)}</span>
              <span class="mc-text">${_esc(c.text)}</span>
            </button>
          `).join('')}
        </div>
      </div>
      <div id="lesson-feedback"></div>
    `;

    _renderMath(container);

    let selectedIndex = null;

    Dashboard._setActionBar(`
      <button class="btn btn-check" id="mc-check" disabled>Check</button>
    `);

    // Wire tile selection
    container.querySelectorAll('.mc-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        if (tile.classList.contains('locked')) return;
        container.querySelectorAll('.mc-tile').forEach(t => t.classList.remove('selected'));
        tile.classList.add('selected');
        selectedIndex = parseInt(tile.dataset.index);
        document.getElementById('mc-check').disabled = false;
      });
    });

    document.getElementById('mc-check').addEventListener('click', () => {
      if (selectedIndex === null) return;

      const isCorrect = selectedIndex === shuffledCorrectIdx;
      const score = isCorrect ? 1.0 : 0.0;

      // Lock all tiles and highlight correct/incorrect
      container.querySelectorAll('.mc-tile').forEach(t => {
        t.classList.add('locked');
        if (parseInt(t.dataset.index) === shuffledCorrectIdx) {
          t.classList.add('correct');
        }
        if (parseInt(t.dataset.index) === selectedIndex && !isCorrect) {
          t.classList.add('incorrect');
        }
      });

      // Update mastery & spaced rep
      Persistence.updateDefinitionMastery(courseId, definition.id, score);
      _updateCards(courseId, definition, score, isCorrect ? null : 'partial');
      if (!isCorrect) {
        Persistence.recordError(courseId, definition._topicId, 'partial');
      }

      // Feedback
      const fb = container.querySelector('#lesson-feedback');
      if (isCorrect) {
        fb.innerHTML = `<div class="feedback-bar correct animate-slide-up">
          <span class="feedback-icon">&#127881;</span>
          <div>${_randomPraise()}</div>
        </div>`;
        Dashboard._setActionBar(`
          <button class="btn btn-continue correct-btn" id="mc-next">Continue</button>
        `);
      } else {
        fb.innerHTML = `<div class="feedback-bar incorrect animate-slide-up">
          <span class="feedback-icon">&#128161;</span>
          <div>
            Correct answer: ${_esc(step.choices[step.correctIndex])}
            ${step.explanation ? '<div class="feedback-detail">' + _esc(step.explanation) + '</div>' : ''}
          </div>
        </div>`;
        Dashboard._setActionBar(`
          <button class="btn btn-continue incorrect-btn" id="mc-next">Got It</button>
        `);
      }

      _renderMath(fb);
      document.getElementById('mc-next').addEventListener('click', () => onNext(isCorrect));
    });
  }

  // ==================== LESSON COMPLETE ====================

  function _showLessonComplete(container, courseId, definition, correct, total) {
    Dashboard._clearActionBar();
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const mastery = Persistence.getDefinitionMastery(courseId, definition.id);

    let icon = '&#128218;';
    let title = 'Keep practicing!';
    if (pct >= 90) { icon = '&#127942;'; title = 'Amazing!'; }
    else if (pct >= 70) { icon = '&#128170;'; title = 'Great job!'; }
    else if (pct >= 50) { icon = '&#128077;'; title = 'Good effort!'; }

    container.innerHTML = `<div class="completion-screen animate-bounce">
      <div class="completion-icon">${icon}</div>
      <div class="completion-title">${title}</div>
      <div class="completion-subtitle">Lesson: ${_esc(definition.name)}</div>
      <div class="completion-stats">
        <div class="completion-stat">
          <div class="completion-stat-value">${pct}%</div>
          <div class="completion-stat-label">Score</div>
        </div>
        <div class="completion-stat">
          <div class="completion-stat-value">${correct}/${total}</div>
          <div class="completion-stat-label">Correct</div>
        </div>
        <div class="completion-stat">
          <div class="completion-stat-value">${mastery.level}%</div>
          <div class="completion-stat-label">Mastery</div>
        </div>
      </div>
      <a href="#${definition._backRoute || 'topic/' + courseId + '/' + definition._topicId}" class="btn btn-primary" style="display:inline-flex;">Continue</a>
    </div>`;
  }

  // ==================== DEFINITION VIEW (topic page card) ====================

  function renderDefinitionView(container, courseId, definition) {
    const mastery = Persistence.getDefinitionMastery(courseId, definition.id);

    container.innerHTML = `
      <div class="topic-header">
        <h1>${_esc(definition.name)}</h1>
        <div class="topic-badge ${mastery.level >= 80 ? 'mastered' : mastery.level > 0 ? 'in-progress' : 'available'}">
          ${mastery.level >= 80 ? '&#10003; ' : ''}${mastery.level}% mastery
        </div>
      </div>
      <div class="lesson-card" style="text-align:left;margin-bottom:20px;">
        <div class="lesson-context">${_esc(definition.formalText || '')}</div>
      </div>
      <div style="text-align:center;">
        <button class="btn btn-primary btn-start-lesson" style="display:inline-flex;">
          ${mastery.reviews > 0 ? 'Practice Again' : 'Start Lesson'}
        </button>
      </div>
    `;

    _renderMath(container);

    container.querySelector('.btn-start-lesson').addEventListener('click', () => {
      renderLesson(container, courseId, definition);
    });
  }

  // ==================== HELPERS ====================

  function _updateCards(courseId, definition, score, mistakeType) {
    const quality = SpacedRepetition.scoreToQuality(score);
    for (const part of (definition.atomicParts || [])) {
      const cardId = `${courseId}:${definition.id}:${part.id}`;
      SpacedRepetition.reviewCard(cardId, quality, score < 0.6 ? mistakeType : null);
    }
  }

  function _randomPraise() {
    const phrases = ['Excellent!', 'Well done!', 'Nailed it!', 'Perfect!', 'Spot on!', 'Great recall!', 'Impressive!'];
    return phrases[Math.floor(Math.random() * phrases.length)];
  }

  function _shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function _esc(t) { const d = document.createElement('div'); d.textContent = t || ''; return d.innerHTML; }

  /** Call KaTeX auto-render on a container element if available */
  function _renderMath(el) {
    if (typeof renderMathInElement === 'function') {
      renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
  }

  return { renderLesson, renderDefinitionView };
})();
