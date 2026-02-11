// ============================================================
// app.js — Main app init, routing, topic/definition/proof pages
// ============================================================
window.App = (() => {

  function init() {
    _setupRoutes();
    Router.init();
  }

  function _setupRoutes() {
    Router.register('dashboard', (container) => {
      Dashboard._clearActionBar();
      Dashboard.render(container);
      _activateNav('dashboard');
    });

    Router.register('review', (container) => {
      Dashboard.renderReview(container);
      _activateNav('review');
    });

    Router.register('progress', (container) => {
      Dashboard._clearActionBar();
      Dashboard.renderProgress(container);
      _activateNav('progress');
    });

    Router.register('topic/:courseId/:topicId', (container, params) => {
      Dashboard._clearActionBar();
      _renderTopicPage(container, params.courseId, params.topicId);
    });

    Router.register('lesson/:courseId/:defId', (container, params) => {
      _renderLessonPage(container, params.courseId, params.defId);
    });

    Router.register('proof/:courseId/:proofId', (container, params) => {
      _renderProofPage(container, params.courseId, params.proofId);
    });

    Router.register('viz/:courseId/:topicId', (container, params) => {
      Dashboard._clearActionBar();
      return Visualization.renderVisualization(container, params.courseId, params.topicId);
    });
  }

  function _activateNav(route) {
    document.querySelectorAll('.topbar-nav a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + route);
    });
    // Update review badge
    const badge = document.getElementById('due-badge');
    const count = SpacedRepetition.getDueCount();
    if (badge) {
      if (count > 0) { badge.textContent = count; badge.style.display = ''; }
      else { badge.style.display = 'none'; }
    }
  }

  // ==================== TOPIC PAGE ====================

  function _renderTopicPage(container, courseId, topicId) {
    const course = ContentRegistry.getCourse(courseId);
    const topic = ContentRegistry.getTopic(courseId, topicId);
    if (!course || !topic) {
      container.innerHTML = '<div class="empty-state"><h2>Topic not found</h2></div>';
      return;
    }

    const status = Persistence.getTopicStatus(courseId, topicId);

    // Locked check
    if (status === 'locked') {
      container.innerHTML = `
        <div class="empty-state animate-slide-up">
          <div class="empty-icon">&#128274;</div>
          <h2>Topic Locked</h2>
          <p>Complete the prerequisite topics to unlock ${_esc(topic.name)}.</p>
          <a href="#dashboard" class="btn btn-secondary" style="display:inline-flex;">Back</a>
        </div>
      `;
      return;
    }

    const mastery = Persistence.getTopicDefinitionMastery(courseId, topicId);

    let html = `
      <div class="animate-slide-up">
        <a href="#dashboard" class="back-btn" style="text-decoration:none;margin-bottom:12px;display:inline-flex;">
          <span class="arrow">&#8592;</span> Back
        </a>
      </div>

      <div class="topic-header animate-slide-up">
        <h1>${_esc(topic.name)}</h1>
        <p style="color:var(--text-secondary);font-size:14px;margin-top:4px;">${_esc(topic.description || '')}</p>
        <div class="topic-badge ${status === 'mastered' ? 'mastered' : mastery > 0 ? 'in-progress' : 'available'}">
          ${status === 'mastered' ? '&#10003; Mastered' : mastery + '% mastery'}
        </div>
      </div>
    `;

    // Definitions section
    if (topic.definitions && topic.definitions.length > 0) {
      html += `<div class="topic-section animate-slide-up" style="animation-delay:0.1s;">
        <div class="topic-section-header">Definitions</div>`;

      for (const def of topic.definitions) {
        const m = Persistence.getDefinitionMastery(courseId, def.id);
        const iconClass = m.level >= 80 ? 'green' : m.level > 0 ? 'gold' : 'blue';
        const icon = m.level >= 80 ? '&#10003;' : '&#9998;';

        html += `
          <div class="topic-item" data-href="#lesson/${courseId}/${def.id}">
            <div class="topic-item-icon ${iconClass}">${icon}</div>
            <div class="topic-item-info">
              <div class="topic-item-name">${_esc(def.name)}</div>
              <div class="topic-item-detail">${m.level >= 80 ? 'Mastered' : m.reviews > 0 ? m.level + '% — tap to practice' : 'Start learning'}</div>
            </div>
            <div class="topic-item-progress">
              <div class="mini-progress">
                <div class="mini-progress-fill ${m.level >= 80 ? 'green' : 'gold'}" style="width:${m.level}%"></div>
              </div>
            </div>
          </div>
        `;
      }
      html += `</div>`;
    }

    // Proofs section
    if (topic.proofs && topic.proofs.length > 0) {
      html += `<div class="topic-section animate-slide-up" style="animation-delay:0.15s;">
        <div class="topic-section-header">Proofs</div>`;

      for (const proof of topic.proofs) {
        const complete = Persistence.isProofComplete(proof.id, proof.steps.length);
        const progress = Persistence.getProofProgress(proof.id);
        const done = progress.completedSteps.length;
        const iconClass = complete ? 'green' : done > 0 ? 'blue' : 'gray';
        const icon = complete ? '&#10003;' : '&#128220;';

        html += `
          <div class="topic-item" data-href="#proof/${courseId}/${proof.id}">
            <div class="topic-item-icon ${iconClass}">${icon}</div>
            <div class="topic-item-info">
              <div class="topic-item-name">${_esc(proof.name)}</div>
              <div class="topic-item-detail">${complete ? 'Completed' : done > 0 ? done + '/' + proof.steps.length + ' steps' : proof.steps.length + ' steps'}</div>
            </div>
          </div>
        `;
      }
      html += `</div>`;
    }

    // Visualization section
    const viz = ContentRegistry.getVisualization(courseId, topicId);
    if (viz) {
      const unlocked = Visualization.isUnlocked(courseId, topicId);
      html += `<div class="topic-section animate-slide-up" style="animation-delay:0.2s;">
        <div class="topic-section-header">3D Visualization</div>
        <div class="topic-item" ${unlocked ? 'data-href="#viz/' + courseId + '/' + topicId + '"' : ''} style="${unlocked ? '' : 'opacity:0.5;cursor:not-allowed;'}">
          <div class="topic-item-icon ${unlocked ? 'green' : 'gray'}">${unlocked ? '&#127912;' : '&#128274;'}</div>
          <div class="topic-item-info">
            <div class="topic-item-name">${_esc(viz.title || 'Interactive Visualization')}</div>
            <div class="topic-item-detail">${unlocked ? 'Tap to explore in 3D' : 'Master definitions & complete proofs to unlock'}</div>
          </div>
        </div>
      `;

      if (!unlocked) {
        const reqs = Visualization.getRequirements(courseId, topicId);
        html += `<div style="padding:8px 20px 16px;">`;
        for (const r of reqs) {
          html += `<div style="font-size:13px;padding:2px 0;color:${r.met ? 'var(--green-dark)' : 'var(--text-secondary)'};">
            ${r.met ? '&#10003;' : '&#9675;'} ${_esc(r.label)} ${r.current ? '(' + r.current + ')' : ''}
          </div>`;
        }
        html += `</div>`;
      }

      html += `</div>`;
    }

    container.innerHTML = html;

    // Wire up clicks
    container.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => Router.navigate(el.dataset.href));
    });
  }

  // ==================== LESSON PAGE ====================

  function _renderLessonPage(container, courseId, defId) {
    const def = ContentRegistry.getDefinition(courseId, defId);
    if (!def) {
      container.innerHTML = '<div class="empty-state"><h2>Definition not found</h2></div>';
      return;
    }
    DefinitionEngine.renderLesson(container, courseId, def);
  }

  // ==================== PROOF PAGE ====================

  function _renderProofPage(container, courseId, proofId) {
    const proof = ContentRegistry.getProof(courseId, proofId);
    if (!proof) {
      container.innerHTML = '<div class="empty-state"><h2>Proof not found</h2></div>';
      return;
    }
    ProofEngine.renderProof(container, courseId, proof);
  }

  function _esc(t) { const d = document.createElement('div'); d.textContent = t||''; return d.innerHTML; }

  return { init };
})();
