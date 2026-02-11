// ============================================================
// definition-engine.js — Duolingo-style lesson flow for definitions
// ============================================================
window.DefinitionEngine = (() => {

  /**
   * Generate a lesson (sequence of micro-questions) from a definition.
   */
  function _generateLesson(definition) {
    const questions = [];

    // 1. Recall the full definition
    questions.push({
      type: 'recall',
      prompt: `What is the definition of "${definition.name}"?`,
      subprompt: 'Write it in your own words — include all key parts.',
      validate: (input) => {
        const result = Utils.scoreDefinitionResponse(input, definition.atomicParts);
        const fb = Utils.feedbackFromScore(result);
        return {
          score: result.overallScore,
          correct: result.overallScore >= 0.7,
          feedback: fb.message,
          detail: result.overallScore < 0.85
            ? result.parts.filter(p => p.score < 0.5).map(p => p.part.text).join('; ')
            : null,
          mistakeType: Utils.classifyMistake(result)
        };
      }
    });

    // 2. One question per atomic part (fill in the blank style)
    for (const part of (definition.atomicParts || [])) {
      questions.push({
        type: 'fill-part',
        prompt: `Complete this part of the definition of ${definition.name}:`,
        subprompt: _makeBlankPrompt(part.text, part.keywords),
        reference: part.text,
        validate: (input) => {
          const kwResult = Utils.keywordMatch(input, part.keywords);
          const sim = Utils.slidingWindowSimilarity(input, part.text);
          const score = kwResult.score * 0.6 + sim * 0.4;
          return {
            score,
            correct: score >= 0.6,
            feedback: score >= 0.6 ? 'Correct!' : `The answer is: ${part.text}`,
            mistakeType: score < 0.4 ? 'omission' : 'partial'
          };
        }
      });
    }

    // 3. Add exercise-specific questions
    for (const ex of (definition.exercises || [])) {
      if (ex.type === 'axiom-id') {
        questions.push({
          type: 'axiom-id',
          prompt: ex.prompt,
          subprompt: 'Which axiom or property fails here?',
          validate: (input) => {
            const targetAxiom = (definition.axioms || []).find(a => a.id === ex.failingAxiom);
            if (!targetAxiom) return { score: 0, correct: false, feedback: 'Error in question data.' };
            const match = Utils.fuzzyMatch(input, targetAxiom.label);
            return {
              score: match.confidence,
              correct: match.match,
              feedback: match.match
                ? `Yes! It's "${targetAxiom.label}". ${ex.explanation || ''}`
                : `Not quite. The answer is: "${targetAxiom.label}". ${ex.explanation || ''}`,
              mistakeType: match.match ? null : 'logical-leap'
            };
          }
        });
      } else if (ex.type === 'counterexample') {
        questions.push({
          type: 'counterexample',
          prompt: ex.prompt,
          subprompt: 'Give specific numbers to show the property fails.',
          validate: (input) => {
            const propMatch = Utils.fuzzyMatch(input, ex.failingProperty);
            const kwResult = Utils.keywordMatch(input, ex.expectedKeywords || []);
            const hasNumbers = /\d/.test(input);
            const score = (propMatch.match ? 0.3 : 0) + kwResult.score * 0.4 + (hasNumbers ? 0.3 : 0);
            return {
              score,
              correct: score >= 0.6,
              feedback: score >= 0.6
                ? 'Nice counterexample!'
                : `Here's an example: ${ex.exampleAnswer || ex.failingProperty}`,
              mistakeType: score < 0.4 ? 'omission' : 'partial'
            };
          }
        });
      } else if (ex.type === 'equivalence') {
        questions.push({
          type: 'equivalence',
          prompt: ex.prompt,
          subprompt: 'Explain both directions of the equivalence.',
          context: `Formulation 1: ${ex.formulation1}\nFormulation 2: ${ex.formulation2}`,
          validate: (input) => {
            const kwResult = Utils.keywordMatch(input, ex.keywords || []);
            const hasBoth = input.length > 100 ||
              (/implies|shows|gives|⇒/.test(input.toLowerCase()) &&
               /converse|other direction|conversely|both/.test(input.toLowerCase()));
            const score = kwResult.score * 0.7 + (hasBoth ? 0.3 : 0.1);
            return {
              score,
              correct: score >= 0.65,
              feedback: score >= 0.65
                ? 'Well explained!'
                : `Key idea: ${ex.explanation || 'Show both directions of the implication.'}`,
              mistakeType: score < 0.4 ? 'logical-leap' : 'partial'
            };
          }
        });
      }
      // fill-in exercises are covered by the recall question above
    }

    return questions;
  }

  /**
   * Create a blank-style prompt: replace keywords with "___"
   */
  function _makeBlankPrompt(text, keywords) {
    if (!keywords || keywords.length === 0) return `"___ ?"`;
    // Just show a hint without the key terms
    let blanked = text;
    for (const kw of keywords) {
      const regex = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      blanked = blanked.replace(regex, '___');
    }
    return blanked;
  }

  /**
   * Render a Duolingo-style definition lesson.
   */
  function renderLesson(container, courseId, definition) {
    const questions = _generateLesson(definition);
    let idx = 0;
    let correctCount = 0;
    let attempts = {};

    function showQuestion() {
      if (idx >= questions.length) {
        _showLessonComplete(container, courseId, definition, correctCount, questions.length);
        return;
      }

      const q = questions[idx];
      const pct = Math.round((idx / questions.length) * 100);
      attempts[idx] = (attempts[idx] || 0);

      container.innerHTML = `
        <div class="animate-slide-up">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
            <a href="#topic/${courseId}/${definition._topicId}" class="back-btn" style="text-decoration:none;">
              <span class="arrow">&#10005;</span>
            </a>
            <div class="lesson-progress" style="flex:1;max-width:none;">
              <div class="lesson-progress-fill" style="width:${pct}%"></div>
            </div>
            <span style="font-size:14px;font-weight:700;color:var(--text-secondary);">${idx + 1}/${questions.length}</span>
          </div>
        </div>
        <div class="lesson-card animate-slide-up" style="animation-delay:0.05s;">
          <div class="lesson-prompt">${_esc(q.prompt)}</div>
          ${q.subprompt ? '<div class="lesson-subprompt">' + _esc(q.subprompt) + '</div>' : ''}
          ${q.context ? '<div class="lesson-context">' + _esc(q.context) + '</div>' : ''}
          ${q.type === 'recall' || q.type === 'equivalence' || q.type === 'counterexample'
            ? `<textarea class="answer-input" id="lesson-input" rows="4" placeholder="Type your answer..."></textarea>`
            : `<input type="text" class="answer-input" id="lesson-input" placeholder="Type your answer...">`
          }
          <div id="lesson-hints"></div>
        </div>
        <div id="lesson-feedback"></div>
      `;

      Dashboard._setActionBar(`
        <button class="btn btn-check" id="lesson-check">Check</button>
      `);

      const input = container.querySelector('#lesson-input');
      input.focus();

      // Enter key submits
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && input.tagName === 'INPUT') {
          e.preventDefault();
          document.getElementById('lesson-check').click();
        }
      });

      document.getElementById('lesson-check').addEventListener('click', () => {
        const value = input.value.trim();
        if (!value) return;

        attempts[idx]++;
        const result = q.validate(value);

        // Update mastery & spaced rep
        Persistence.updateDefinitionMastery(courseId, definition.id, result.score);
        if (result.mistakeType && !result.correct) {
          Persistence.recordError(courseId, definition._topicId, result.mistakeType);
        }
        // Update SR cards for related atomic parts
        _updateCards(courseId, definition, result.score, result.mistakeType);

        input.classList.add(result.correct ? 'correct' : 'incorrect');
        input.disabled = true;

        const fb = container.querySelector('#lesson-feedback');
        if (result.correct) {
          correctCount++;
          fb.innerHTML = `<div class="feedback-bar correct animate-slide-up">
            <span class="feedback-icon">&#127881;</span>
            <div>${_randomPraise()}${result.detail ? '<div class="feedback-detail">' + _esc(result.detail) + '</div>' : ''}</div>
          </div>`;
          Dashboard._setActionBar(`
            <button class="btn btn-continue correct-btn" id="lesson-next">Continue</button>
          `);
        } else {
          fb.innerHTML = `<div class="feedback-bar incorrect animate-slide-up">
            <span class="feedback-icon">&#128161;</span>
            <div>Correct answer:
              <div class="feedback-detail">${_esc(result.feedback)}</div>
            </div>
          </div>`;
          Dashboard._setActionBar(`
            <button class="btn btn-continue incorrect-btn" id="lesson-next">Got It</button>
          `);
        }

        // Show hints if multiple attempts
        if (!result.correct && attempts[idx] >= 2) {
          const hintsDiv = container.querySelector('#lesson-hints');
          if (hintsDiv) {
            hintsDiv.innerHTML = `<div class="hint-box">
              <strong>Hint</strong>
              ${q.reference ? _esc(q.reference) : 'Review the definition carefully.'}
            </div>`;
          }
        }

        document.getElementById('lesson-next').addEventListener('click', () => {
          idx++;
          showQuestion();
        });
      });
    }

    showQuestion();
  }

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
      <a href="#topic/${courseId}/${definition._topicId}" class="btn btn-primary" style="display:inline-flex;">Continue</a>
    </div>`;
  }

  /**
   * Render the definition view for a topic page (overview card).
   */
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

    container.querySelector('.btn-start-lesson').addEventListener('click', () => {
      renderLesson(container, courseId, definition);
    });
  }

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

  function _esc(t) { const d = document.createElement('div'); d.textContent = t || ''; return d.innerHTML; }

  return { renderLesson, renderDefinitionView };
})();
