// ============================================================
// dashboard.js — Duolingo-style skill tree, review, progress
// ============================================================
window.Dashboard = (() => {

  function render(container) {
    const courses = ContentRegistry.getAllCourses();
    const dueCount = SpacedRepetition.getDueCount();
    _updateBadge(dueCount);

    let html = `<div class="section-header">
      <h1>Your Path</h1>
      <p>Master each topic to unlock the next one</p>
    </div>`;

    // Stats row
    let totalDefs = 0, masteredDefs = 0, totalProofs = 0, completedProofs = 0;
    for (const course of courses) {
      for (const topic of (course.topics || [])) {
        for (const def of (topic.definitions || [])) {
          totalDefs++;
          if (Persistence.getDefinitionMastery(course.id, def.id).level >= 80) masteredDefs++;
        }
        for (const proof of (topic.proofs || [])) {
          totalProofs++;
          if (Persistence.isProofComplete(proof.id, proof.steps.length)) completedProofs++;
        }
      }
    }

    html += `<div class="stats-row">
      <div class="stat-card">
        <div class="stat-card-value blue">${dueCount}</div>
        <div class="stat-card-label">Due Today</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-value green">${masteredDefs}</div>
        <div class="stat-card-label">Definitions</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-value gold">${completedProofs}</div>
        <div class="stat-card-label">Proofs Done</div>
      </div>
    </div>`;

    // Skill tree for each course
    for (const course of courses) {
      html += _renderSkillTree(course);
    }

    container.innerHTML = html;

    // Wire clicks
    container.querySelectorAll('.skill-node:not(.locked)').forEach(node => {
      node.addEventListener('click', () => {
        Router.navigate(`topic/${node.dataset.courseId}/${node.dataset.topicId}`);
      });
    });
  }

  function _renderSkillTree(course) {
    const topics = course.topics || [];
    let html = '<div class="skill-tree">';

    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];
      const status = Persistence.getTopicStatus(course.id, topic.id);
      const mastery = Persistence.getTopicDefinitionMastery(course.id, topic.id);

      // Determine node style
      let nodeClass = 'available';
      let icon = i + 1;
      if (status === 'mastered') { nodeClass = 'completed'; icon = '&#10003;'; }
      else if (status === 'in-progress') { nodeClass = 'current'; }
      else if (status === 'locked') { nodeClass = 'locked'; icon = '&#128274;'; }

      // Connector
      if (i > 0) {
        const prevStatus = Persistence.getTopicStatus(course.id, topics[i-1].id);
        html += `<div class="skill-connector ${prevStatus === 'mastered' ? 'completed' : ''}"></div>`;
      }

      html += `<div class="skill-group">
        <div class="skill-node ${nodeClass}" data-course-id="${course.id}" data-topic-id="${topic.id}">
          ${icon}
        </div>
        <div class="skill-label ${nodeClass === 'locked' ? 'locked' : ''}">${_esc(topic.name)}</div>
        <div class="skill-sublabel">${status === 'locked' ? 'Complete previous' : mastery + '% mastered'}</div>
      </div>`;
    }

    html += '</div>';
    return html;
  }

  // ==================== REVIEW ====================

  function renderReview(container) {
    const cards = SpacedRepetition.getReviewSession(20);
    _updateBadge(cards.length);

    if (cards.length === 0) {
      container.innerHTML = `<div class="empty-state animate-slide-up">
        <div class="empty-icon">&#127881;</div>
        <h2>All caught up!</h2>
        <p>No cards due for review right now. Nice work!</p>
        <a href="#dashboard" class="btn btn-primary">Back to Learning</a>
      </div>`;
      return;
    }

    let idx = 0;
    let correct = 0;

    function showCard() {
      if (idx >= cards.length) {
        _showReviewComplete(container, correct, cards.length);
        return;
      }

      const card = cards[idx];
      const pct = Math.round((idx / cards.length) * 100);

      container.innerHTML = `
        <div class="review-header animate-slide-up">
          <div class="lesson-progress" style="max-width:100%;margin-bottom:16px;">
            <div class="lesson-progress-fill" style="width:${pct}%"></div>
          </div>
          <span class="review-tag">${_esc(card.definitionName)}</span>
          <h2>${_esc(card.prompt)}</h2>
        </div>
        <div class="lesson-card animate-slide-up" style="animation-delay:0.1s;">
          <textarea class="answer-input" id="review-input" rows="3"
            placeholder="Type your answer..."></textarea>
        </div>
        <div id="review-feedback"></div>
      `;

      // Action bar
      _setActionBar(`
        <button class="btn btn-check" id="review-check">Check</button>
      `);

      const input = container.querySelector('#review-input');
      input.focus();

      document.getElementById('review-check').addEventListener('click', () => {
        const value = input.value.trim();
        if (!value) return;

        const kwResult = Utils.keywordMatch(value, card.keywords || []);
        const simScore = Utils.slidingWindowSimilarity(value, card.reference);
        const score = kwResult.score * 0.6 + simScore * 0.4;
        const quality = SpacedRepetition.scoreToQuality(score);
        let mistakeType = null;
        if (score < 0.6) mistakeType = kwResult.matched.length === 0 ? 'omission' : 'partial';

        SpacedRepetition.reviewCard(card.id, quality, mistakeType);
        Persistence.updateDefinitionMastery(card.courseId, card.definitionId, score);

        const isCorrect = score >= 0.7;
        if (isCorrect) correct++;

        input.classList.add(isCorrect ? 'correct' : 'incorrect');
        input.disabled = true;

        const fb = container.querySelector('#review-feedback');
        if (isCorrect) {
          fb.innerHTML = `<div class="feedback-bar correct animate-slide-up">
            <span class="feedback-icon">&#128079;</span>
            <div>Great recall!</div>
          </div>`;
        } else {
          fb.innerHTML = `<div class="feedback-bar incorrect animate-slide-up">
            <span class="feedback-icon">&#128161;</span>
            <div>Correct answer:
              <div class="feedback-detail">${_esc(card.reference)}</div>
            </div>
          </div>`;
        }

        _setActionBar(`
          <button class="btn btn-continue ${isCorrect ? 'correct-btn' : 'incorrect-btn'}" id="review-next">Continue</button>
        `);

        document.getElementById('review-next').addEventListener('click', () => {
          idx++;
          showCard();
        });
      });
    }

    showCard();
  }

  function _showReviewComplete(container, correct, total) {
    _clearActionBar();
    const pct = Math.round((correct / total) * 100);
    container.innerHTML = `<div class="completion-screen animate-bounce">
      <div class="completion-icon">${pct >= 80 ? '&#127942;' : pct >= 50 ? '&#128170;' : '&#128218;'}</div>
      <div class="completion-title">Review Complete!</div>
      <div class="completion-subtitle">You reviewed ${total} cards</div>
      <div class="completion-stats">
        <div class="completion-stat">
          <div class="completion-stat-value">${pct}%</div>
          <div class="completion-stat-label">Accuracy</div>
        </div>
        <div class="completion-stat">
          <div class="completion-stat-value">${correct}</div>
          <div class="completion-stat-label">Correct</div>
        </div>
      </div>
      <a href="#dashboard" class="btn btn-primary">Continue</a>
    </div>`;
  }

  // ==================== PROGRESS ====================

  function renderProgress(container) {
    const courses = ContentRegistry.getAllCourses();
    let html = `<div class="section-header">
      <h1>Your Progress</h1>
      <p>Track your mastery across all topics</p>
    </div>`;

    for (const course of courses) {
      for (const topic of (course.topics || [])) {
        const status = Persistence.getTopicStatus(course.id, topic.id);
        const mastery = Persistence.getTopicDefinitionMastery(course.id, topic.id);

        html += `<div class="topic-section">
          <div class="topic-section-header">
            ${_esc(topic.name)}
            <span style="float:right;font-size:14px;font-weight:800;${status === 'mastered' ? 'color:var(--green-dark)' : ''}">${mastery}%</span>
          </div>`;

        // Definitions
        for (const def of (topic.definitions || [])) {
          const m = Persistence.getDefinitionMastery(course.id, def.id);
          html += `<div class="topic-item">
            <div class="topic-item-icon ${m.level >= 80 ? 'green' : m.level > 0 ? 'gold' : 'gray'}">
              ${m.level >= 80 ? '&#10003;' : '&#9998;'}
            </div>
            <div class="topic-item-info">
              <div class="topic-item-name">${_esc(def.name)}</div>
              <div class="topic-item-detail">${m.reviews} reviews &middot; ${m.level}% mastery</div>
            </div>
            <div class="topic-item-progress">
              <div class="mini-progress">
                <div class="mini-progress-fill ${m.level >= 80 ? 'green' : 'gold'}" style="width:${m.level}%"></div>
              </div>
            </div>
          </div>`;
        }

        // Proofs
        for (const proof of (topic.proofs || [])) {
          const complete = Persistence.isProofComplete(proof.id, proof.steps.length);
          const progress = Persistence.getProofProgress(proof.id);
          const done = progress.completedSteps.length;
          html += `<div class="topic-item">
            <div class="topic-item-icon ${complete ? 'green' : done > 0 ? 'blue' : 'gray'}">
              ${complete ? '&#10003;' : '&#128220;'}
            </div>
            <div class="topic-item-info">
              <div class="topic-item-name">${_esc(proof.name)}</div>
              <div class="topic-item-detail">${complete ? 'Completed' : done + '/' + proof.steps.length + ' steps'}</div>
            </div>
          </div>`;
        }

        html += '</div>';
      }
    }

    // Error heatmap
    const errors = Persistence.getErrorHeatmap();
    if (Object.keys(errors).length > 0) {
      html += `<div class="topic-section" style="margin-top:24px;">
        <div class="topic-section-header">Error Heatmap</div>
        <div style="padding:16px;overflow-x:auto;">
          <table class="heatmap-table">
            <thead><tr><th>Topic</th><th>Omit</th><th>Partial</th><th>Logic</th><th>Minor</th></tr></thead>
            <tbody>`;

      for (const course of courses) {
        for (const topic of (course.topics || [])) {
          const e = Persistence.getTopicErrors(course.id, topic.id);
          const total = e.omission + e.partial + e['logical-leap'] + e.minor;
          if (total === 0) continue;
          html += `<tr>
            <td style="font-weight:700;">${_esc(topic.name)}</td>
            <td><span class="heatmap-cell heatmap-${_heat(e.omission)}">${e.omission}</span></td>
            <td><span class="heatmap-cell heatmap-${_heat(e.partial)}">${e.partial}</span></td>
            <td><span class="heatmap-cell heatmap-${_heat(e['logical-leap'])}">${e['logical-leap']}</span></td>
            <td><span class="heatmap-cell heatmap-${_heat(e.minor)}">${e.minor}</span></td>
          </tr>`;
        }
      }
      html += `</tbody></table></div></div>`;
    }

    container.innerHTML = html;
  }

  // ==================== HELPERS ====================

  function _updateBadge(count) {
    const badge = document.getElementById('due-badge');
    if (badge) {
      if (count > 0) { badge.textContent = count; badge.style.display = ''; }
      else { badge.style.display = 'none'; }
    }
  }

  function _setActionBar(html) {
    let bar = document.querySelector('.action-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'action-bar';
      document.body.appendChild(bar);
    }
    bar.innerHTML = `<div class="action-inner">${html}</div>`;
    bar.style.display = '';
  }

  function _clearActionBar() {
    const bar = document.querySelector('.action-bar');
    if (bar) bar.style.display = 'none';
  }

  function _heat(n) { return n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 10 ? 3 : 4; }

  function _esc(t) { const d = document.createElement('div'); d.textContent = t || ''; return d.innerHTML; }

  return { render, renderReview, renderProgress, _setActionBar, _clearActionBar };
})();
