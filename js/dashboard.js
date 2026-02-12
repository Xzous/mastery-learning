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

  // ==================== HOMEWORK ====================

  function renderHomework(container) {
    const hwData = window.HomeworkData || {};
    const hwIds = Object.keys(hwData);

    if (hwIds.length === 0) {
      container.innerHTML = `<div class="empty-state animate-slide-up">
        <div class="empty-icon">&#128218;</div>
        <h2>No Homework Yet</h2>
        <p>Homework assignments will appear here.</p>
        <a href="#dashboard" class="btn btn-primary" style="display:inline-flex;">Back to Learning</a>
      </div>`;
      return;
    }

    let html = `<div class="section-header">
      <h1>Homework</h1>
      <p>Step-by-step guided problem solving</p>
    </div>`;

    for (const hwId of hwIds) {
      const hw = hwData[hwId];
      const questions = hw.questions || [];
      let completed = 0;
      for (const q of questions) {
        const m = Persistence.getDefinitionMastery(hwId, q.id);
        if (m.reviews > 0) completed++;
      }
      const pct = questions.length > 0 ? Math.round((completed / questions.length) * 100) : 0;

      html += `<div class="topic-section animate-slide-up" style="animation-delay:0.05s;">
        <div class="topic-section-header" style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div>${_esc(hw.name)}</div>
            <div style="font-size:12px;font-weight:600;color:var(--text-light);margin-top:2px;">Due: ${_esc(hw.dueDate || '')}</div>
          </div>
          <div style="font-size:14px;font-weight:800;${pct === 100 ? 'color:var(--green-dark)' : ''}">${completed}/${questions.length}</div>
        </div>
        <div style="padding:0 16px 8px;">
          <div class="mini-progress" style="height:6px;margin-bottom:12px;">
            <div class="mini-progress-fill ${pct === 100 ? 'green' : 'gold'}" style="width:${pct}%"></div>
          </div>
        </div>`;

      for (const q of questions) {
        const m = Persistence.getDefinitionMastery(hwId, q.id);
        const done = m.reviews > 0;
        const iconClass = done ? 'green' : 'blue';
        const icon = done ? '&#10003;' : '&#9998;';

        html += `
          <div class="topic-item" data-href="#hw/${hwId}/${q.id}">
            <div class="topic-item-icon ${iconClass}">${icon}</div>
            <div class="topic-item-info">
              <div class="topic-item-name">${_esc(q.name)}</div>
              <div class="topic-item-detail">${done ? 'Completed — tap to review' : 'Tap to start learning'}</div>
            </div>
          </div>
        `;
      }
      html += `</div>`;
    }

    container.innerHTML = html;

    _renderMath(container);

    // Wire clicks
    container.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => Router.navigate(el.dataset.href));
    });
  }

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

  return { render, renderHomework, renderProgress, _setActionBar, _clearActionBar };
})();
