// ============================================================
// definition-engine.js — Definition exercises, validation, feedback UI
// ============================================================
window.DefinitionEngine = (() => {

  /**
   * Render a fill-in-the-definition exercise.
   */
  function renderFillIn(container, courseId, definition) {
    const exercise = (definition.exercises || []).find(e => e.type === 'fill-in');
    const prompt = exercise ? exercise.prompt : `State the complete definition of: ${definition.name}`;

    container.innerHTML = `
      <div class="exercise-container" data-def-id="${definition.id}">
        <div class="exercise-prompt">${_escHtml(prompt)}</div>
        <div class="exercise-subprompt">Write your answer in complete sentences. Include all key components.</div>
        <div class="form-group">
          <textarea class="textarea-input" id="fill-in-input" rows="6"
            placeholder="Write the complete definition here..."></textarea>
        </div>
        <div class="exercise-actions">
          <button class="btn btn-primary" id="fill-in-submit">Check Answer</button>
          <span class="attempt-counter" id="fill-in-attempts"></span>
        </div>
        <div id="fill-in-feedback"></div>
      </div>
    `;

    let attempts = 0;

    container.querySelector('#fill-in-submit').addEventListener('click', () => {
      const input = container.querySelector('#fill-in-input').value.trim();
      if (!input) return;

      attempts++;
      const result = Utils.scoreDefinitionResponse(input, definition.atomicParts);
      const feedback = Utils.feedbackFromScore(result);
      const mistakeType = Utils.classifyMistake(result);

      // Update mastery
      Persistence.updateDefinitionMastery(courseId, definition.id, result.overallScore);

      // Record error if not correct
      if (result.overallScore < 0.85) {
        Persistence.recordError(courseId, definition._topicId, mistakeType);
      }

      // Update spaced repetition cards
      _updateRelatedCards(courseId, definition, result);

      // Show feedback
      _renderFeedback(
        container.querySelector('#fill-in-feedback'),
        feedback,
        result,
        definition
      );

      container.querySelector('#fill-in-attempts').textContent = `Attempt ${attempts}`;
    });
  }

  /**
   * Render an axiom identification exercise.
   */
  function renderAxiomId(container, courseId, definition, exercise) {
    container.innerHTML = `
      <div class="exercise-container" data-def-id="${definition.id}">
        <div class="exercise-prompt">${_escHtml(exercise.prompt)}</div>
        <div class="exercise-subprompt">Identify which axiom or property fails and explain why.</div>
        <div class="form-group">
          <label class="form-label">Which axiom/property fails?</label>
          <input type="text" class="text-input" id="axiom-id-input"
            placeholder="e.g., associativity of addition">
        </div>
        <div class="form-group">
          <label class="form-label">Explain why it fails:</label>
          <textarea class="textarea-input" id="axiom-explain-input" rows="4"
            placeholder="Show a specific example where the axiom doesn't hold..."></textarea>
        </div>
        <div class="exercise-actions">
          <button class="btn btn-primary" id="axiom-id-submit">Check Answer</button>
          <span class="attempt-counter" id="axiom-id-attempts"></span>
        </div>
        <div id="axiom-id-feedback"></div>
        <div id="axiom-id-hints"></div>
      </div>
    `;

    let attempts = 0;

    container.querySelector('#axiom-id-submit').addEventListener('click', () => {
      const axiomInput = container.querySelector('#axiom-id-input').value.trim();
      const explainInput = container.querySelector('#axiom-explain-input').value.trim();
      if (!axiomInput) return;

      attempts++;

      // Find the target axiom
      const targetAxiom = (definition.axioms || []).find(a => a.id === exercise.failingAxiom);
      let axiomCorrect = false;
      let explainScore = 0;

      if (targetAxiom) {
        // Check if the axiom identification is correct
        const axiomMatch = Utils.fuzzyMatch(axiomInput, targetAxiom.label);
        axiomCorrect = axiomMatch.match;

        // Check explanation
        if (explainInput) {
          const kwResult = Utils.keywordMatch(explainInput, exercise.keywords || []);
          explainScore = kwResult.score;
        }
      }

      const overallScore = axiomCorrect ? (0.5 + explainScore * 0.5) : explainScore * 0.3;

      // Update mastery
      Persistence.updateDefinitionMastery(courseId, definition.id, overallScore);

      if (overallScore < 0.6) {
        Persistence.recordError(courseId, definition._topicId, axiomCorrect ? 'partial' : 'logical-leap');
      }

      // Feedback
      const fbContainer = container.querySelector('#axiom-id-feedback');
      if (axiomCorrect && explainScore >= 0.6) {
        fbContainer.innerHTML = `<div class="feedback correct">
          Correct! The failing axiom is <strong>${_escHtml(targetAxiom.label)}</strong>.
          ${exercise.explanation ? '<br><br>' + _escHtml(exercise.explanation) : ''}
        </div>`;
      } else if (axiomCorrect) {
        fbContainer.innerHTML = `<div class="feedback partial">
          You correctly identified <strong>${_escHtml(targetAxiom.label)}</strong>, but your explanation needs more detail.
          ${exercise.explanation ? '<br><br><strong>Expected:</strong> ' + _escHtml(exercise.explanation) : ''}
        </div>`;
      } else {
        fbContainer.innerHTML = `<div class="feedback incorrect">
          That's not the axiom that fails here. Think about each axiom systematically.
        </div>`;
      }

      // Hints
      _showHints(container.querySelector('#axiom-id-hints'), attempts, [
        targetAxiom ? `Think about what "${targetAxiom.label}" requires.` : 'Check each axiom one by one.',
        targetAxiom && targetAxiom.counterexample ? `Hint: ${targetAxiom.counterexample.explanation}` : 'Try plugging in specific numbers.'
      ]);

      container.querySelector('#axiom-id-attempts').textContent = `Attempt ${attempts}`;
    });
  }

  /**
   * Render a counterexample exercise.
   */
  function renderCounterexample(container, courseId, definition, exercise) {
    container.innerHTML = `
      <div class="exercise-container" data-def-id="${definition.id}">
        <div class="exercise-prompt">${_escHtml(exercise.prompt)}</div>
        <div class="exercise-subprompt">Provide a specific numerical example. Show which property fails and why.</div>
        <div class="form-group">
          <label class="form-label">Which property fails?</label>
          <input type="text" class="text-input" id="ce-property-input"
            placeholder="e.g., closure under addition">
        </div>
        <div class="form-group">
          <label class="form-label">Your counterexample (use specific numbers):</label>
          <textarea class="textarea-input" id="ce-example-input" rows="4"
            placeholder="Let x = ..., y = .... Then x + y = ..., which is not in the set because..."></textarea>
        </div>
        <div class="exercise-actions">
          <button class="btn btn-primary" id="ce-submit">Check Answer</button>
          <span class="attempt-counter" id="ce-attempts"></span>
        </div>
        <div id="ce-feedback"></div>
        <div id="ce-hints"></div>
      </div>
    `;

    let attempts = 0;

    container.querySelector('#ce-submit').addEventListener('click', () => {
      const propertyInput = container.querySelector('#ce-property-input').value.trim();
      const exampleInput = container.querySelector('#ce-example-input').value.trim();
      if (!propertyInput && !exampleInput) return;

      attempts++;

      // Check property identification
      const propMatch = Utils.fuzzyMatch(propertyInput, exercise.failingProperty);
      const propCorrect = propMatch.match;

      // Check example keywords
      const kwResult = Utils.keywordMatch(exampleInput, exercise.expectedKeywords || []);
      const exampleScore = kwResult.score;

      // Check if they used actual numbers
      const hasNumbers = /\d/.test(exampleInput);

      const overallScore = (propCorrect ? 0.4 : 0) + (exampleScore * 0.4) + (hasNumbers ? 0.2 : 0);

      Persistence.updateDefinitionMastery(courseId, definition.id, overallScore);

      if (overallScore < 0.6) {
        Persistence.recordError(courseId, definition._topicId, propCorrect ? 'partial' : 'omission');
      }

      const fbContainer = container.querySelector('#ce-feedback');
      if (propCorrect && exampleScore >= 0.6 && hasNumbers) {
        fbContainer.innerHTML = `<div class="feedback correct">
          Correct! You identified that <strong>${_escHtml(exercise.failingProperty)}</strong> fails
          and provided a valid counterexample.
        </div>`;
      } else if (propCorrect) {
        fbContainer.innerHTML = `<div class="feedback partial">
          You identified the right property, but your example needs more detail.
          ${exercise.exampleAnswer ? '<br><br><strong>Example:</strong> ' + _escHtml(exercise.exampleAnswer) : ''}
        </div>`;
      } else {
        fbContainer.innerHTML = `<div class="feedback incorrect">
          The failing property is not quite right. Think about what it means to be ${definition.name ? 'a ' + definition.name.toLowerCase() : 'valid'}.
        </div>`;
      }

      _showHints(container.querySelector('#ce-hints'), attempts, [
        `The property that fails is related to: ${exercise.failingProperty}`,
        exercise.exampleAnswer ? `Consider: ${exercise.exampleAnswer}` : 'Try simple integers like 0, 1, -1.'
      ]);

      container.querySelector('#ce-attempts').textContent = `Attempt ${attempts}`;
    });
  }

  /**
   * Render a definition equivalence exercise.
   */
  function renderEquivalence(container, courseId, definition, exercise) {
    container.innerHTML = `
      <div class="exercise-container" data-def-id="${definition.id}">
        <div class="exercise-prompt">${_escHtml(exercise.prompt)}</div>
        <div class="card" style="margin: 12px 0;">
          <div class="card-body" style="padding: 12px 16px;">
            <div style="margin-bottom: 10px;">
              <strong>Formulation 1:</strong> ${_escHtml(exercise.formulation1)}
            </div>
            <div>
              <strong>Formulation 2:</strong> ${_escHtml(exercise.formulation2)}
            </div>
          </div>
        </div>
        <div class="exercise-subprompt">Explain why these two formulations are logically equivalent. Show both directions.</div>
        <div class="form-group">
          <textarea class="textarea-input" id="equiv-input" rows="6"
            placeholder="To show (1) implies (2): ...&#10;To show (2) implies (1): ..."></textarea>
        </div>
        <div class="exercise-actions">
          <button class="btn btn-primary" id="equiv-submit">Check Answer</button>
          <span class="attempt-counter" id="equiv-attempts"></span>
        </div>
        <div id="equiv-feedback"></div>
        <div id="equiv-hints"></div>
      </div>
    `;

    let attempts = 0;

    container.querySelector('#equiv-submit').addEventListener('click', () => {
      const input = container.querySelector('#equiv-input').value.trim();
      if (!input) return;

      attempts++;

      // Check keywords
      const kwResult = Utils.keywordMatch(input, exercise.keywords || []);

      // Check if both directions are addressed
      const hasBothDirections = (
        (input.toLowerCase().includes('implies') || input.toLowerCase().includes('⇒') ||
         input.toLowerCase().includes('shows') || input.toLowerCase().includes('gives us')) &&
        (input.toLowerCase().includes('converse') || input.toLowerCase().includes('other direction') ||
         input.toLowerCase().includes('conversely') || /\(2\).*\(1\)|\(1\).*from.*\(2\)/i.test(input) ||
         input.toLowerCase().includes('both directions'))
      ) || input.length > 150; // Long answer likely covers both

      const overallScore = kwResult.score * 0.7 + (hasBothDirections ? 0.3 : 0.1);

      Persistence.updateDefinitionMastery(courseId, definition.id, overallScore);

      if (overallScore < 0.6) {
        Persistence.recordError(courseId, definition._topicId, 'logical-leap');
      }

      const fbContainer = container.querySelector('#equiv-feedback');
      if (overallScore >= 0.75) {
        fbContainer.innerHTML = `<div class="feedback correct">
          Well explained! You've shown the logical equivalence of these formulations.
          ${exercise.explanation ? '<br><br>' + _escHtml(exercise.explanation) : ''}
        </div>`;
      } else if (overallScore >= 0.5) {
        fbContainer.innerHTML = `<div class="feedback partial">
          Partially correct. Make sure to address both directions of the equivalence.
          <br><br><strong>Key idea:</strong> ${_escHtml(exercise.explanation || '')}
        </div>`;
      } else {
        fbContainer.innerHTML = `<div class="feedback incorrect">
          Your explanation is missing key components. Remember: equivalence means showing both (1)⇒(2) and (2)⇒(1).
        </div>`;
      }

      _showHints(container.querySelector('#equiv-hints'), attempts, [
        'For (1)⇒(2): try combining the conditions in formulation 1 into a single expression.',
        `Key insight: ${exercise.explanation || 'Think about what each formulation actually requires.'}`
      ]);

      container.querySelector('#equiv-attempts').textContent = `Attempt ${attempts}`;
    });
  }

  /**
   * Render the definition view for a topic: formal text + all exercises.
   */
  function renderDefinitionView(container, courseId, definition) {
    const mastery = Persistence.getDefinitionMastery(courseId, definition.id);

    let html = `
      <div class="card">
        <div class="card-header">
          <h3>${_escHtml(definition.name)}</h3>
          <span class="badge ${mastery.level >= 80 ? 'badge-success' : mastery.level >= 40 ? 'badge-warning' : 'badge-muted'}">
            ${mastery.level}% mastery
          </span>
        </div>
        <div class="card-body">
          <div class="math-block">${_escHtml(definition.formalText || '')}</div>
    `;

    // Show axioms if present
    if (definition.axioms && definition.axioms.length > 0) {
      html += `<div style="margin-top: 16px;"><strong>Axioms:</strong></div>
        <ol style="margin: 8px 0 0 20px; font-size: 13px; color: var(--text-secondary);">`;
      for (const ax of definition.axioms) {
        html += `<li style="padding: 2px 0;"><strong>${_escHtml(ax.label)}:</strong> <span class="math">${_escHtml(ax.statement)}</span></li>`;
      }
      html += `</ol>`;
    }

    html += `</div></div>`;

    // Exercise tabs
    const exercises = definition.exercises || [];
    if (exercises.length > 0) {
      html += `<div class="tabs" id="def-exercise-tabs">`;
      exercises.forEach((ex, i) => {
        const label = _exerciseTypeLabel(ex.type);
        html += `<button class="tab ${i === 0 ? 'active' : ''}" data-exercise-idx="${i}">${label}</button>`;
      });
      html += `</div>`;
      html += `<div id="def-exercise-area"></div>`;
    }

    container.innerHTML = html;

    // Wire up tabs
    if (exercises.length > 0) {
      const tabs = container.querySelectorAll('#def-exercise-tabs .tab');
      const area = container.querySelector('#def-exercise-area');

      function showExercise(idx) {
        tabs.forEach(t => t.classList.remove('active'));
        tabs[idx].classList.add('active');
        const ex = exercises[idx];
        _renderExerciseByType(area, courseId, definition, ex);
      }

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          showExercise(parseInt(tab.dataset.exerciseIdx));
        });
      });

      // Show first exercise
      showExercise(0);
    }
  }

  function _renderExerciseByType(container, courseId, definition, exercise) {
    switch (exercise.type) {
      case 'fill-in':
        renderFillIn(container, courseId, definition);
        break;
      case 'axiom-id':
        renderAxiomId(container, courseId, definition, exercise);
        break;
      case 'counterexample':
        renderCounterexample(container, courseId, definition, exercise);
        break;
      case 'equivalence':
        renderEquivalence(container, courseId, definition, exercise);
        break;
      default:
        container.innerHTML = `<p class="text-secondary">Unknown exercise type: ${exercise.type}</p>`;
    }
  }

  function _exerciseTypeLabel(type) {
    switch (type) {
      case 'fill-in': return 'Define';
      case 'axiom-id': return 'Axiom ID';
      case 'counterexample': return 'Counterexample';
      case 'equivalence': return 'Equivalence';
      default: return type;
    }
  }

  function _renderFeedback(container, feedback, scoreResult, definition) {
    let html = `<div class="feedback ${feedback.type}">
      <strong>${feedback.message}</strong>`;

    if (scoreResult && scoreResult.parts) {
      html += `<ul class="matched-parts">`;
      for (const p of scoreResult.parts) {
        const cls = p.score >= 0.6 ? 'matched' : 'missing';
        const icon = p.score >= 0.6 ? '&#10003;' : '&#10007;';
        html += `<li class="${cls}">${icon} ${_escHtml(p.part.text)}</li>`;
      }
      html += `</ul>`;
    }

    html += `</div>`;
    container.innerHTML = html;
  }

  function _showHints(container, attempts, hints) {
    if (!container || !hints || hints.length === 0) return;

    let html = '';
    if (attempts >= 2 && hints[0]) {
      html += `<div class="hint-container">
        <div class="hint-label">Hint 1</div>
        <div class="hint">${_escHtml(hints[0])}</div>
      </div>`;
    }
    if (attempts >= 4 && hints[1]) {
      html += `<div class="hint-container">
        <div class="hint-label">Hint 2</div>
        <div class="hint">${_escHtml(hints[1])}</div>
      </div>`;
    }
    container.innerHTML = html;
  }

  function _updateRelatedCards(courseId, definition, scoreResult) {
    const quality = SpacedRepetition.scoreToQuality(scoreResult.overallScore);
    const mistakeType = Utils.classifyMistake(scoreResult);

    for (const part of (definition.atomicParts || [])) {
      const cardId = `${courseId}:${definition.id}:${part.id}`;
      const partResult = scoreResult.parts.find(p => p.part.id === part.id);
      if (partResult) {
        const partQuality = SpacedRepetition.scoreToQuality(partResult.score);
        SpacedRepetition.reviewCard(cardId, partQuality, partResult.score < 0.6 ? mistakeType : null);
      }
    }
  }

  function _escHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }

  return {
    renderFillIn,
    renderAxiomId,
    renderCounterexample,
    renderEquivalence,
    renderDefinitionView
  };
})();
