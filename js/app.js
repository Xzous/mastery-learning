// ============================================================
// app.js — Main application init, route registration, sidebar
// ============================================================
window.App = (() => {

  function init() {
    _setupRoutes();
    _renderSidebar();
    Router.init();
  }

  function _setupRoutes() {
    // Dashboard
    Router.register('dashboard', (container) => {
      Dashboard.render(container);
    });

    // Review session
    Router.register('review', (container) => {
      Dashboard.renderReview(container);
    });

    // Progress page
    Router.register('progress', (container) => {
      Dashboard.renderProgress(container);
    });

    // Topic view
    Router.register('topic/:courseId/:topicId', (container, params) => {
      _renderTopicPage(container, params.courseId, params.topicId);
    });

    // Definition exercise view
    Router.register('definition/:courseId/:defId', (container, params) => {
      _renderDefinitionPage(container, params.courseId, params.defId);
    });

    // Proof view
    Router.register('proof/:courseId/:proofId', (container, params) => {
      _renderProofPage(container, params.courseId, params.proofId);
    });

    // Visualization view
    Router.register('viz/:courseId/:topicId', (container, params) => {
      return Visualization.renderVisualization(container, params.courseId, params.topicId);
    });
  }

  // ---- Page Renderers ----

  function _renderTopicPage(container, courseId, topicId) {
    const course = ContentRegistry.getCourse(courseId);
    const topic = ContentRegistry.getTopic(courseId, topicId);

    if (!course || !topic) {
      container.innerHTML = '<div class="page-header"><h1>Topic Not Found</h1></div>';
      return;
    }

    const status = Persistence.getTopicStatus(courseId, topicId);
    if (status === 'locked') {
      container.innerHTML = `
        <div class="page-header">
          <div class="breadcrumb"><a href="#dashboard">Dashboard</a> / ${_esc(course.name)}</div>
          <h1>${_esc(topic.name)}</h1>
        </div>
        <div class="card">
          <div class="card-body" style="text-align:center;padding:48px;">
            <div style="font-size:48px;opacity:0.4;margin-bottom:12px;">&#128274;</div>
            <h3 style="color:var(--text-secondary);margin-bottom:8px;">Topic Locked</h3>
            <p style="color:var(--text-muted);">Complete prerequisite topics to unlock this one.</p>
            <p style="color:var(--text-muted);font-size:13px;margin-top:8px;">
              Prerequisites: ${(topic.prerequisites || []).map(pid => {
                const pt = ContentRegistry.getTopic(courseId, pid);
                return pt ? pt.name : pid;
              }).join(', ')}
            </p>
          </div>
        </div>
      `;
      return;
    }

    const mastery = Persistence.getTopicDefinitionMastery(courseId, topicId);

    let html = `
      <div class="page-header">
        <div class="breadcrumb"><a href="#dashboard">Dashboard</a> / <a href="#dashboard">${_esc(course.name)}</a></div>
        <h1>${_esc(topic.name)}</h1>
        <p>${_esc(topic.description || '')}</p>
      </div>

      <div class="progress-label">
        <span>Overall Mastery</span>
        <span>${mastery}%</span>
      </div>
      <div class="progress-bar" style="margin-bottom: 28px;">
        <div class="progress-fill ${mastery >= 80 ? 'green' : mastery >= 40 ? 'yellow' : 'red'}" style="width:${mastery}%"></div>
      </div>
    `;

    // Definitions section
    if (topic.definitions && topic.definitions.length > 0) {
      html += `
        <div class="card">
          <div class="card-header"><h2>Definitions</h2></div>
          <div class="card-body">
            <ul class="def-list">
      `;
      for (const def of topic.definitions) {
        const m = Persistence.getDefinitionMastery(courseId, def.id);
        html += `
          <li class="def-item" style="cursor:pointer;" data-href="#definition/${courseId}/${def.id}">
            <span class="def-name">${_esc(def.name)}</span>
            <div class="def-mastery">
              <div class="progress-bar" style="height:6px;">
                <div class="progress-fill ${m.level >= 80 ? 'green' : m.level >= 40 ? 'yellow' : 'red'}" style="width:${m.level}%"></div>
              </div>
              <span style="font-size:11px;color:var(--text-muted);">${m.level}%</span>
            </div>
          </li>`;
      }
      html += `</ul></div></div>`;
    }

    // Proofs section
    if (topic.proofs && topic.proofs.length > 0) {
      html += `
        <div class="card">
          <div class="card-header"><h2>Proofs</h2></div>
          <div class="card-body">
            <ul class="proof-list">
      `;
      for (const proof of topic.proofs) {
        const complete = Persistence.isProofComplete(proof.id, proof.steps.length);
        const progress = Persistence.getProofProgress(proof.id);
        const done = progress.completedSteps.length;
        html += `
          <li class="proof-item" data-href="#proof/${courseId}/${proof.id}">
            <span class="proof-name">${_esc(proof.name)}</span>
            <span class="proof-status badge ${complete ? 'badge-success' : done > 0 ? 'badge-warning' : 'badge-muted'}">
              ${complete ? 'Complete' : `${done}/${proof.steps.length} steps`}
            </span>
          </li>`;
      }
      html += `</ul></div></div>`;
    }

    // Visualization section
    const viz = ContentRegistry.getVisualization(courseId, topicId);
    if (viz) {
      const unlocked = Visualization.isUnlocked(courseId, topicId);
      html += `
        <div class="card">
          <div class="card-header">
            <h2>3D Visualization</h2>
            <span class="badge ${unlocked ? 'badge-success' : 'badge-muted'}">${unlocked ? 'Unlocked' : 'Locked'}</span>
          </div>
          <div class="card-body">
            <p style="color:var(--text-secondary);font-size:14px;margin-bottom:12px;">${_esc(viz.title || '')}: ${_esc(viz.description || '')}</p>
            <a href="#viz/${courseId}/${topicId}" class="btn ${unlocked ? 'btn-accent' : 'btn-secondary'}"
              ${unlocked ? '' : 'style="opacity:0.5;pointer-events:none;"'}>
              ${unlocked ? 'Open Visualization' : 'Complete requirements to unlock'}
            </a>
      `;

      if (!unlocked) {
        const reqs = Visualization.getRequirements(courseId, topicId);
        html += `<ul style="margin-top:10px;list-style:none;">`;
        for (const r of reqs) {
          html += `<li style="font-size:13px;padding:2px 0;color:${r.met ? 'var(--success)' : 'var(--text-muted)'};">
            ${r.met ? '&#10003;' : '&#9675;'} ${_esc(r.label)} ${r.current ? '(' + r.current + ')' : ''}
          </li>`;
        }
        html += `</ul>`;
      }

      html += `</div></div>`;
    }

    container.innerHTML = html;

    // Wire up clickable items
    container.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        Router.navigate(el.dataset.href);
      });
    });
  }

  function _renderDefinitionPage(container, courseId, defId) {
    const course = ContentRegistry.getCourse(courseId);
    const def = ContentRegistry.getDefinition(courseId, defId);

    if (!course || !def) {
      container.innerHTML = '<div class="page-header"><h1>Definition Not Found</h1></div>';
      return;
    }

    const topic = ContentRegistry.getTopic(courseId, def._topicId);

    let html = `
      <div class="page-header">
        <div class="breadcrumb">
          <a href="#dashboard">Dashboard</a> /
          <a href="#topic/${courseId}/${def._topicId}">${_esc(topic ? topic.name : '')}</a>
        </div>
      </div>
      <div id="definition-content"></div>
    `;

    container.innerHTML = html;
    DefinitionEngine.renderDefinitionView(
      container.querySelector('#definition-content'),
      courseId,
      def
    );
  }

  function _renderProofPage(container, courseId, proofId) {
    const course = ContentRegistry.getCourse(courseId);
    const proof = ContentRegistry.getProof(courseId, proofId);

    if (!course || !proof) {
      container.innerHTML = '<div class="page-header"><h1>Proof Not Found</h1></div>';
      return;
    }

    ProofEngine.renderProof(container, courseId, proof);
  }

  // ---- Sidebar ----

  function _renderSidebar() {
    const topicsContainer = document.getElementById('sidebar-topics');
    if (!topicsContainer) return;

    const courses = ContentRegistry.getAllCourses();
    let html = '';

    for (const course of courses) {
      html += `<div class="sidebar-section">${_esc(course.name)}</div>`;
      html += `<div class="sidebar-course">`;

      for (const topic of (course.topics || [])) {
        const status = Persistence.getTopicStatus(course.id, topic.id);
        html += `
          <a href="#topic/${course.id}/${topic.id}" class="topic-link">
            <span class="topic-status ${status}"></span>
            <span class="topic-text">${_esc(topic.name)}</span>
          </a>
        `;
      }

      html += `</div>`;
    }

    topicsContainer.innerHTML = html;

    // Update due badge
    const dueCount = SpacedRepetition.getDueCount();
    const badge = document.getElementById('due-badge');
    if (badge) {
      if (dueCount > 0) {
        badge.textContent = dueCount;
        badge.style.display = '';
      } else {
        badge.style.display = 'none';
      }
    }
  }

  // ---- Helpers ----

  function _esc(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }

  return { init };
})();
