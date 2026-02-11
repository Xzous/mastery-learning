// ============================================================
// proof-engine.js — Proof step rendering, validation, hints
// ============================================================
window.ProofEngine = (() => {

  /**
   * Render a complete proof exercise with step-by-step progression.
   */
  function renderProof(container, courseId, proof) {
    const progress = Persistence.getProofProgress(proof.id);
    const totalSteps = proof.steps.length;
    const completedSteps = progress.completedSteps || [];

    // Find first incomplete step
    let activeStep = 0;
    for (let i = 0; i < totalSteps; i++) {
      if (completedSteps.includes(i)) {
        activeStep = i + 1;
      } else {
        break;
      }
    }

    let html = `
      <div class="page-header">
        <div class="breadcrumb">
          <a href="#topic/${courseId}/${proof._topicId}">Back to topic</a>
        </div>
        <h1>${_esc(proof.name)}</h1>
        <p>${_esc(proof.description || '')}</p>
      </div>
      <div class="proof-container" id="proof-steps">
    `;

    for (let i = 0; i < totalSteps; i++) {
      const step = proof.steps[i];
      const isCompleted = completedSteps.includes(i);
      const isActive = i === activeStep && activeStep < totalSteps;
      const isLocked = i > activeStep;

      const statusClass = isCompleted ? 'completed' : isActive ? 'active' : 'locked';
      const stepLabel = _stepTypeLabel(step.type);

      html += `
        <div class="proof-step ${statusClass}" data-step="${i}">
          <div class="proof-step-header">
            <div class="step-number">${i + 1}</div>
            <span>${_esc(stepLabel)}: ${_esc(step.prompt)}</span>
            ${isCompleted ? '<span class="badge badge-success" style="margin-left:auto;">&#10003;</span>' : ''}
          </div>
          <div class="proof-step-body" id="step-body-${i}">
      `;

      if (isCompleted) {
        // Show completed answer
        const savedAnswer = _getSavedAnswer(proof.id, i);
        html += `<div class="completed-answer">${_esc(savedAnswer || step.expected)}</div>`;
      } else if (isActive) {
        html += _renderStepInput(step, i);
      }

      html += `</div></div>`;
    }

    // Completion message
    if (activeStep >= totalSteps) {
      html += `
        <div class="card" style="border-color: var(--success); margin-top: 20px;">
          <div class="card-body" style="text-align: center; padding: 32px;">
            <div style="font-size: 32px; margin-bottom: 12px;">&#10003;</div>
            <h3 style="color: var(--success); margin-bottom: 8px;">Proof Complete!</h3>
            <p style="color: var(--text-secondary);">You have successfully completed this proof step by step.</p>
            <a href="#topic/${courseId}/${proof._topicId}" class="btn btn-primary" style="margin-top: 16px;">Back to Topic</a>
          </div>
        </div>
      `;
    }

    html += `</div>`;
    container.innerHTML = html;

    // Wire up active step if exists
    if (activeStep < totalSteps) {
      _wireStepInput(container, courseId, proof, activeStep);
    }
  }

  /**
   * Render input UI for a step based on its type.
   */
  function _renderStepInput(step, stepIndex) {
    let html = '';

    switch (step.type) {
      case 'state-goal':
        html = `
          <div class="form-group">
            <label class="form-label">State what must be shown:</label>
            <textarea class="textarea-input" id="step-input-${stepIndex}" rows="3"
              placeholder="We need to show that..."></textarea>
          </div>
        `;
        break;

      case 'justify':
        html = `
          <div class="form-group">
            <label class="form-label">Provide the expression and justification:</label>
            <textarea class="textarea-input mono" id="step-input-${stepIndex}" rows="3"
              placeholder="expression = ... (by axiom/definition name)"></textarea>
          </div>
        `;
        break;

      case 'chain':
        html = `
          <div class="form-group">
            <label class="form-label">Complete the chain of equalities with justifications:</label>
            <textarea class="textarea-input mono" id="step-input-${stepIndex}" rows="5"
              placeholder="   = expression    (justification)&#10;   = expression    (justification)&#10;   = expression    (justification)"></textarea>
          </div>
        `;
        break;

      case 'conclude':
        html = `
          <div class="form-group">
            <label class="form-label">State the conclusion:</label>
            <textarea class="textarea-input" id="step-input-${stepIndex}" rows="3"
              placeholder="Therefore, ..."></textarea>
          </div>
        `;
        break;

      case 'checklist':
        html = `
          <div class="form-group">
            <label class="form-label">What must we verify? (list the conditions)</label>
            <textarea class="textarea-input" id="step-input-${stepIndex}" rows="4"
              placeholder="1. ...&#10;2. ...&#10;3. ..."></textarea>
          </div>
        `;
        break;

      default:
        html = `
          <div class="form-group">
            <textarea class="textarea-input" id="step-input-${stepIndex}" rows="3"
              placeholder="Your answer..."></textarea>
          </div>
        `;
    }

    html += `
      <div class="exercise-actions">
        <button class="btn btn-primary" id="step-submit-${stepIndex}">Submit Step</button>
        <span class="attempt-counter" id="step-attempts-${stepIndex}"></span>
      </div>
      <div id="step-feedback-${stepIndex}"></div>
      <div id="step-hints-${stepIndex}"></div>
    `;

    return html;
  }

  /**
   * Wire up event listeners for the active step's input.
   */
  function _wireStepInput(container, courseId, proof, stepIndex) {
    const step = proof.steps[stepIndex];
    const submitBtn = container.querySelector(`#step-submit-${stepIndex}`);
    if (!submitBtn) return;

    submitBtn.addEventListener('click', () => {
      const input = container.querySelector(`#step-input-${stepIndex}`);
      if (!input) return;
      const value = input.value.trim();
      if (!value) return;

      // Record attempt
      const attemptCount = Persistence.recordProofAttempt(proof.id, stepIndex);

      // Validate
      const result = _validateStep(value, step);

      const fbContainer = container.querySelector(`#step-feedback-${stepIndex}`);
      const hintContainer = container.querySelector(`#step-hints-${stepIndex}`);
      const attemptLabel = container.querySelector(`#step-attempts-${stepIndex}`);
      attemptLabel.textContent = `Attempt ${attemptCount}`;

      if (result.correct) {
        // Mark step complete
        Persistence.markProofStepComplete(proof.id, stepIndex);
        _saveAnswer(proof.id, stepIndex, value);

        fbContainer.innerHTML = `<div class="feedback correct">${result.message}</div>`;

        // Re-render the entire proof to show next step
        setTimeout(() => {
          renderProof(container, courseId, proof);
        }, 800);

      } else {
        // Record mistake
        Persistence.recordProofMistake(proof.id, stepIndex, result.mistakeType || 'partial');
        Persistence.recordError(courseId, proof._topicId, result.mistakeType || 'partial');

        fbContainer.innerHTML = `<div class="feedback ${result.partial ? 'partial' : 'incorrect'}">${result.message}</div>`;

        // Show hints based on attempt count
        _showProofHints(hintContainer, attemptCount, step.hints || []);
      }
    });
  }

  /**
   * Validate a step answer against expected.
   */
  function _validateStep(input, step) {
    const keywords = step.keywords || [];
    const expected = step.expected || '';

    // Keyword matching
    const kwResult = Utils.keywordMatch(input, keywords);

    // Similarity to expected answer
    const similarity = Utils.slidingWindowSimilarity(input, expected);

    // Combined score
    const score = kwResult.score * 0.6 + similarity * 0.4;

    if (score >= 0.7) {
      return {
        correct: true,
        score,
        message: 'Correct! Well reasoned.'
      };
    }

    if (score >= 0.45) {
      return {
        correct: false,
        partial: true,
        score,
        message: `Partially correct. You're on the right track but missing key elements: ${kwResult.missing.slice(0, 3).join(', ')}`,
        mistakeType: 'partial'
      };
    }

    // Determine mistake type
    let mistakeType = 'logical-leap';
    if (kwResult.matched.length === 0) {
      mistakeType = 'omission';
    }

    return {
      correct: false,
      partial: false,
      score,
      message: `Not quite. Review the definitions and think about what this step requires.`,
      mistakeType
    };
  }

  /**
   * Show progressive hints.
   */
  function _showProofHints(container, attempts, hints) {
    if (!container || !hints.length) return;

    let html = '';
    if (attempts >= 2 && hints[0]) {
      html += `<div class="hint-container">
        <div class="hint-label">Hint 1</div>
        <div class="hint">${_esc(hints[0])}</div>
      </div>`;
    }
    if (attempts >= 4 && hints[1]) {
      html += `<div class="hint-container">
        <div class="hint-label">Hint 2</div>
        <div class="hint">${_esc(hints[1])}</div>
      </div>`;
    }
    container.innerHTML = html;
  }

  // ---- Answer Persistence ----

  function _saveAnswer(proofId, stepIndex, answer) {
    try {
      const key = `proof_answer_${proofId}_${stepIndex}`;
      localStorage.setItem(key, answer);
    } catch (e) { /* ignore */ }
  }

  function _getSavedAnswer(proofId, stepIndex) {
    try {
      return localStorage.getItem(`proof_answer_${proofId}_${stepIndex}`);
    } catch (e) { return null; }
  }

  // ---- Helpers ----

  function _stepTypeLabel(type) {
    switch (type) {
      case 'state-goal': return 'Goal';
      case 'justify': return 'Justify';
      case 'chain': return 'Chain';
      case 'conclude': return 'Conclude';
      case 'checklist': return 'Verify';
      default: return 'Step';
    }
  }

  function _esc(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }

  return {
    renderProof
  };
})();
