// ============================================================
// proof-engine.js — Duolingo-style proof step-by-step
// ============================================================
window.ProofEngine = (() => {

  function renderProof(container, courseId, proof) {
    const progress = Persistence.getProofProgress(proof.id);
    const totalSteps = proof.steps.length;
    const completedSteps = progress.completedSteps || [];

    // Find first incomplete step
    let activeStep = 0;
    for (let i = 0; i < totalSteps; i++) {
      if (completedSteps.includes(i)) activeStep = i + 1;
      else break;
    }

    // If all done, show completion
    if (activeStep >= totalSteps) {
      _showProofComplete(container, courseId, proof, completedSteps);
      return;
    }

    // Render as lesson-style: show completed steps above, active step as question
    const pct = Math.round((activeStep / totalSteps) * 100);
    const step = proof.steps[activeStep];

    let html = `
      <div class="animate-slide-up">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
          <a href="#topic/${courseId}/${proof._topicId}" class="back-btn" style="text-decoration:none;">
            <span class="arrow">&#10005;</span>
          </a>
          <div class="lesson-progress" style="flex:1;max-width:none;">
            <div class="lesson-progress-fill" style="width:${pct}%"></div>
          </div>
          <span style="font-size:14px;font-weight:700;color:var(--text-secondary);">Step ${activeStep + 1}/${totalSteps}</span>
        </div>

        <div class="section-header" style="margin-bottom:16px;">
          <h1 style="font-size:20px;">${_esc(proof.name)}</h1>
          <p style="font-size:14px;">${_esc(proof.description || '')}</p>
        </div>
      </div>
    `;

    // Show completed steps as collapsed cards
    for (let i = 0; i < activeStep; i++) {
      const s = proof.steps[i];
      const savedAnswer = _getSavedAnswer(proof.id, i);
      html += `
        <div class="proof-step completed">
          <div class="proof-step-header">
            <div class="step-number">${i + 1}</div>
            ${_esc(_stepLabel(s.type))}: ${_esc(s.prompt)}
            <span style="margin-left:auto;color:var(--green);">&#10003;</span>
          </div>
          <div class="proof-step-body">
            <div class="completed-answer">${_esc(savedAnswer || s.expected)}</div>
          </div>
        </div>
      `;
    }

    // Active step as a lesson card
    html += `
      <div class="lesson-card animate-slide-up" style="text-align:left;margin-top:16px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <div class="step-number" style="background:var(--blue-light);color:var(--blue-dark);">${activeStep + 1}</div>
          <span style="font-size:12px;font-weight:800;text-transform:uppercase;color:var(--blue);letter-spacing:0.5px;">
            ${_esc(_stepLabel(step.type))}
          </span>
        </div>
        <div class="lesson-prompt" style="text-align:left;font-size:18px;">${_esc(step.prompt)}</div>
        <div style="margin-top:16px;">
          <textarea class="answer-input" id="proof-input" rows="${step.type === 'chain' ? 5 : 3}"
            placeholder="${_placeholder(step.type)}"></textarea>
        </div>
        <div id="proof-hints"></div>
      </div>
      <div id="proof-feedback"></div>
    `;

    // Locked steps preview
    for (let i = activeStep + 1; i < totalSteps; i++) {
      const s = proof.steps[i];
      html += `
        <div class="proof-step locked">
          <div class="proof-step-header">
            <div class="step-number">${i + 1}</div>
            ${_esc(_stepLabel(s.type))}: ${_esc(s.prompt)}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;

    // Action bar
    Dashboard._setActionBar(`
      <button class="btn btn-check" id="proof-check">Check</button>
    `);

    const input = container.querySelector('#proof-input');
    input.focus();

    document.getElementById('proof-check').addEventListener('click', () => {
      const value = input.value.trim();
      if (!value) return;

      const attemptCount = Persistence.recordProofAttempt(proof.id, activeStep);
      const result = _validateStep(value, step);

      input.classList.add(result.correct ? 'correct' : 'incorrect');
      input.disabled = true;

      const fb = container.querySelector('#proof-feedback');

      if (result.correct) {
        Persistence.markProofStepComplete(proof.id, activeStep);
        _saveAnswer(proof.id, activeStep, value);

        fb.innerHTML = `<div class="feedback-bar correct animate-slide-up">
          <span class="feedback-icon">&#10003;</span>
          <div>${_randomPraise()}</div>
        </div>`;

        Dashboard._setActionBar(`
          <button class="btn btn-continue correct-btn" id="proof-next">Continue</button>
        `);

        document.getElementById('proof-next').addEventListener('click', () => {
          renderProof(container, courseId, proof);
        });
      } else {
        Persistence.recordProofMistake(proof.id, activeStep, result.mistakeType || 'partial');
        Persistence.recordError(courseId, proof._topicId, result.mistakeType || 'partial');

        fb.innerHTML = `<div class="feedback-bar incorrect animate-slide-up">
          <span class="feedback-icon">&#128161;</span>
          <div>${result.message}${result.missing ? '<div class="feedback-detail">Missing: ' + _esc(result.missing) + '</div>' : ''}</div>
        </div>`;

        // Show hints
        if (attemptCount >= 2 && step.hints && step.hints.length > 0) {
          const hintsDiv = container.querySelector('#proof-hints');
          let hintHtml = '';
          if (step.hints[0]) {
            hintHtml += `<div class="hint-box"><strong>Hint 1</strong>${_esc(step.hints[0])}</div>`;
          }
          if (attemptCount >= 4 && step.hints[1]) {
            hintHtml += `<div class="hint-box" style="margin-top:8px;"><strong>Hint 2</strong>${_esc(step.hints[1])}</div>`;
          }
          hintsDiv.innerHTML = hintHtml;
        }

        // Re-enable for retry
        Dashboard._setActionBar(`
          <button class="btn btn-check" id="proof-retry">Try Again</button>
        `);

        document.getElementById('proof-retry').addEventListener('click', () => {
          input.disabled = false;
          input.classList.remove('incorrect');
          input.value = '';
          input.focus();
          fb.innerHTML = '';
          Dashboard._setActionBar(`
            <button class="btn btn-check" id="proof-check-retry">Check</button>
          `);
          // Re-wire check for retry
          document.getElementById('proof-check-retry').addEventListener('click', () => {
            document.getElementById('proof-check')?.click();
            // Re-run validation
            const val2 = input.value.trim();
            if (!val2) return;
            const ac2 = Persistence.recordProofAttempt(proof.id, activeStep);
            const r2 = _validateStep(val2, step);
            input.classList.add(r2.correct ? 'correct' : 'incorrect');
            input.disabled = true;

            if (r2.correct) {
              Persistence.markProofStepComplete(proof.id, activeStep);
              _saveAnswer(proof.id, activeStep, val2);
              fb.innerHTML = `<div class="feedback-bar correct animate-slide-up">
                <span class="feedback-icon">&#10003;</span><div>${_randomPraise()}</div>
              </div>`;
              Dashboard._setActionBar(`
                <button class="btn btn-continue correct-btn" id="proof-next2">Continue</button>
              `);
              document.getElementById('proof-next2').addEventListener('click', () => {
                renderProof(container, courseId, proof);
              });
            } else {
              Persistence.recordProofMistake(proof.id, activeStep, r2.mistakeType || 'partial');
              fb.innerHTML = `<div class="feedback-bar incorrect animate-slide-up">
                <span class="feedback-icon">&#128161;</span><div>${r2.message}</div>
              </div>`;
              // After many attempts, offer to see the answer
              if (ac2 >= 5) {
                fb.innerHTML += `<div class="hint-box" style="margin-top:12px;">
                  <strong>Expected Answer</strong>${_esc(step.expected)}
                </div>`;
                Dashboard._setActionBar(`
                  <button class="btn btn-continue incorrect-btn" id="proof-accept">I Understand — Continue</button>
                `);
                document.getElementById('proof-accept').addEventListener('click', () => {
                  Persistence.markProofStepComplete(proof.id, activeStep);
                  _saveAnswer(proof.id, activeStep, '(reviewed answer)');
                  renderProof(container, courseId, proof);
                });
              } else {
                Dashboard._setActionBar(`
                  <button class="btn btn-check" id="proof-retry2">Try Again</button>
                `);
                document.getElementById('proof-retry2').addEventListener('click', () => {
                  input.disabled = false;
                  input.classList.remove('incorrect');
                  input.value = '';
                  input.focus();
                  fb.innerHTML = '';
                });
              }
            }
          });
        });
      }
    });
  }

  function _showProofComplete(container, courseId, proof, completedSteps) {
    Dashboard._clearActionBar();
    container.innerHTML = `<div class="completion-screen animate-bounce">
      <div class="completion-icon">&#128272;</div>
      <div class="completion-title">Proof Complete!</div>
      <div class="completion-subtitle">${_esc(proof.name)}</div>
      <div class="completion-stats">
        <div class="completion-stat">
          <div class="completion-stat-value">${proof.steps.length}</div>
          <div class="completion-stat-label">Steps</div>
        </div>
      </div>
      <a href="#topic/${courseId}/${proof._topicId}" class="btn btn-primary" style="display:inline-flex;">Continue</a>
    </div>`;
  }

  function _validateStep(input, step) {
    const keywords = step.keywords || [];
    const expected = step.expected || '';
    const kwResult = Utils.keywordMatch(input, keywords);
    const similarity = Utils.slidingWindowSimilarity(input, expected);
    const score = kwResult.score * 0.6 + similarity * 0.4;

    if (score >= 0.65) {
      return { correct: true, score, message: 'Correct!' };
    }
    if (score >= 0.4) {
      return {
        correct: false, partial: true, score,
        message: 'Close, but missing key elements.',
        missing: kwResult.missing.slice(0, 3).join(', '),
        mistakeType: 'partial'
      };
    }
    return {
      correct: false, partial: false, score,
      message: 'Not quite — review the definitions and try again.',
      mistakeType: kwResult.matched.length === 0 ? 'omission' : 'logical-leap'
    };
  }

  function _saveAnswer(proofId, stepIdx, answer) {
    try { localStorage.setItem(`proof_answer_${proofId}_${stepIdx}`, answer); } catch(e) {}
  }
  function _getSavedAnswer(proofId, stepIdx) {
    try { return localStorage.getItem(`proof_answer_${proofId}_${stepIdx}`); } catch(e) { return null; }
  }

  function _stepLabel(type) {
    switch(type) {
      case 'state-goal': return 'State the Goal';
      case 'justify': return 'Justify';
      case 'chain': return 'Chain of Equalities';
      case 'conclude': return 'Conclude';
      case 'checklist': return 'Verify';
      default: return 'Step';
    }
  }

  function _placeholder(type) {
    switch(type) {
      case 'state-goal': return 'We need to show that...';
      case 'justify': return 'expression = ... (by property name)';
      case 'chain': return '= expression  (justification)\n= expression  (justification)';
      case 'conclude': return 'Therefore, ...';
      default: return 'Your answer...';
    }
  }

  function _randomPraise() {
    const p = ['Excellent!', 'Well done!', 'Nailed it!', 'Perfect reasoning!', 'Spot on!', 'Great logic!'];
    return p[Math.floor(Math.random() * p.length)];
  }

  function _esc(t) { const d = document.createElement('div'); d.textContent = t||''; return d.innerHTML; }

  return { renderProof };
})();
