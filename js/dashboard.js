// ============================================================
// dashboard.js — Topic map, error heatmap, progress indicators
// ============================================================
window.Dashboard = (() => {

  /**
   * Render the main dashboard.
   */
  function render(container) {
    const courses = ContentRegistry.getAllCourses();
    const dueCount = SpacedRepetition.getDueCount();

    // Update sidebar badge
    const badge = document.getElementById('due-badge');
    if (badge) {
      if (dueCount > 0) {
        badge.textContent = dueCount;
        badge.style.display = '';
      } else {
        badge.style.display = 'none';
      }
    }

    let html = `
      <div class="page-header">
        <h1>Dashboard</h1>
        <p>Your learning overview across all courses.</p>
      </div>
    `;

    // Stats summary
    html += _renderStats(courses, dueCount);

    // Per-course sections
    for (const course of courses) {
      html += `
        <div class="card" style="margin-bottom: 24px;">
          <div class="card-header">
            <h2>${_esc(course.name)}</h2>
            <a href="#course/${course.id}" class="btn btn-sm btn-secondary">View Course</a>
          </div>
          <div class="card-body">
      `;

      // Topic dependency map
      html += _renderTopicMap(course);

      html += `</div></div>`;
    }

    // Due for review
    if (dueCount > 0) {
      html += `
        <div class="card">
          <div class="card-header">
            <h2>Due for Review</h2>
            <a href="#review" class="btn btn-sm btn-accent">Start Review (${dueCount})</a>
          </div>
          <div class="card-body">
            <p style="color: var(--text-secondary); font-size: 14px;">
              You have ${dueCount} card${dueCount !== 1 ? 's' : ''} due for review.
              Regular review strengthens long-term retention.
            </p>
          </div>
        </div>
      `;
    }

    // Error heatmap
    html += _renderErrorHeatmapCard(courses);

    container.innerHTML = html;

    // Wire up topic node clicks
    container.querySelectorAll('.topic-node:not(.locked)').forEach(node => {
      node.addEventListener('click', () => {
        const courseId = node.dataset.courseId;
        const topicId = node.dataset.topicId;
        Router.navigate(`topic/${courseId}/${topicId}`);
      });
    });
  }

  function _renderStats(courses, dueCount) {
    let totalDefs = 0, masteredDefs = 0, totalProofs = 0, completedProofs = 0;

    for (const course of courses) {
      for (const topic of (course.topics || [])) {
        for (const def of (topic.definitions || [])) {
          totalDefs++;
          const m = Persistence.getDefinitionMastery(course.id, def.id);
          if (m.level >= 80) masteredDefs++;
        }
        for (const proof of (topic.proofs || [])) {
          totalProofs++;
          if (Persistence.isProofComplete(proof.id, proof.steps.length)) completedProofs++;
        }
      }
    }

    return `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value accent">${dueCount}</div>
          <div class="stat-label">Cards Due for Review</div>
        </div>
        <div class="stat-card">
          <div class="stat-value success">${masteredDefs}/${totalDefs}</div>
          <div class="stat-label">Definitions Mastered</div>
        </div>
        <div class="stat-card">
          <div class="stat-value warning">${completedProofs}/${totalProofs}</div>
          <div class="stat-label">Proofs Completed</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${courses.length}</div>
          <div class="stat-label">Active Courses</div>
        </div>
      </div>
    `;
  }

  function _renderTopicMap(course) {
    const topics = course.topics || [];
    if (topics.length === 0) return '<p style="color:var(--text-muted)">No topics available.</p>';

    let html = '<div class="topic-map">';

    // Arrange topics in a vertical flow with arrows
    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];
      const status = Persistence.getTopicStatus(course.id, topic.id);
      const mastery = Persistence.getTopicDefinitionMastery(course.id, topic.id);

      // Count completed proofs
      let proofsDone = 0, proofsTotal = (topic.proofs || []).length;
      for (const p of (topic.proofs || [])) {
        if (Persistence.isProofComplete(p.id, p.steps.length)) proofsDone++;
      }

      html += `
        <div class="topic-map-row">
          <div class="topic-node ${status}" data-course-id="${course.id}" data-topic-id="${topic.id}">
            <div class="topic-name">${_esc(topic.name)}</div>
            <div class="topic-progress">
              ${status === 'locked' ? 'Locked' : `${mastery}% | ${proofsDone}/${proofsTotal} proofs`}
            </div>
            <div style="margin-top: 6px;">
              <div class="progress-bar" style="height:4px;">
                <div class="progress-fill ${status === 'mastered' ? 'green' : 'blue'}"
                  style="width:${mastery}%"></div>
              </div>
            </div>
          </div>
        </div>
      `;

      if (i < topics.length - 1) {
        html += '<div class="topic-arrow-down">&#8595;</div>';
      }
    }

    html += '</div>';
    return html;
  }

  function _renderErrorHeatmapCard(courses) {
    const errors = Persistence.getErrorHeatmap();
    const hasErrors = Object.keys(errors).length > 0;

    if (!hasErrors) return '';

    let html = `
      <div class="card" style="margin-top: 24px;">
        <div class="card-header"><h2>Error Heatmap</h2></div>
        <div class="card-body" style="overflow-x: auto;">
          <table class="heatmap-table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Omissions</th>
                <th>Partial</th>
                <th>Logical Leaps</th>
                <th>Minor</th>
              </tr>
            </thead>
            <tbody>
    `;

    for (const course of courses) {
      for (const topic of (course.topics || [])) {
        const e = Persistence.getTopicErrors(course.id, topic.id);
        const total = e.omission + e.partial + e['logical-leap'] + e.minor;
        if (total === 0) continue;

        html += `<tr>
          <td>${_esc(topic.name)}</td>
          <td><span class="heatmap-cell heatmap-${_heatLevel(e.omission)}">${e.omission}</span></td>
          <td><span class="heatmap-cell heatmap-${_heatLevel(e.partial)}">${e.partial}</span></td>
          <td><span class="heatmap-cell heatmap-${_heatLevel(e['logical-leap'])}">${e['logical-leap']}</span></td>
          <td><span class="heatmap-cell heatmap-${_heatLevel(e.minor)}">${e.minor}</span></td>
        </tr>`;
      }
    }

    html += `</tbody></table></div></div>`;
    return html;
  }

  /**
   * Render the progress page.
   */
  function renderProgress(container) {
    const courses = ContentRegistry.getAllCourses();

    let html = `
      <div class="page-header">
        <h1>Progress</h1>
        <p>Detailed progress across all topics and definitions.</p>
      </div>
    `;

    for (const course of courses) {
      html += `<h2 style="margin-bottom: 16px;">${_esc(course.name)}</h2>`;

      for (const topic of (course.topics || [])) {
        const status = Persistence.getTopicStatus(course.id, topic.id);
        const mastery = Persistence.getTopicDefinitionMastery(course.id, topic.id);

        html += `
          <div class="card">
            <div class="card-header">
              <h3>${_esc(topic.name)}</h3>
              <span class="badge badge-${status === 'mastered' ? 'success' : status === 'in-progress' ? 'warning' : status === 'available' ? 'info' : 'muted'}">${status}</span>
            </div>
            <div class="card-body">
              <div class="progress-label">
                <span>Definition Mastery</span>
                <span>${mastery}%</span>
              </div>
              <div class="progress-bar" style="margin-bottom: 16px;">
                <div class="progress-fill ${mastery >= 80 ? 'green' : mastery >= 40 ? 'yellow' : 'red'}" style="width:${mastery}%"></div>
              </div>
        `;

        // Individual definitions
        if (topic.definitions && topic.definitions.length > 0) {
          html += `<ul class="def-list">`;
          for (const def of topic.definitions) {
            const m = Persistence.getDefinitionMastery(course.id, def.id);
            html += `
              <li class="def-item">
                <span class="def-name">${_esc(def.name)}</span>
                <div class="def-mastery">
                  <div class="progress-bar" style="height:6px;">
                    <div class="progress-fill ${m.level >= 80 ? 'green' : m.level >= 40 ? 'yellow' : 'red'}" style="width:${m.level}%"></div>
                  </div>
                  <span style="font-size:11px;color:var(--text-muted);">${m.level}% (${m.reviews} reviews)</span>
                </div>
              </li>`;
          }
          html += `</ul>`;
        }

        // Proofs
        if (topic.proofs && topic.proofs.length > 0) {
          html += `<div style="margin-top: 12px; font-size: 13px; color: var(--text-secondary); font-weight: 500;">Proofs</div>`;
          html += `<ul class="proof-list">`;
          for (const proof of topic.proofs) {
            const complete = Persistence.isProofComplete(proof.id, proof.steps.length);
            const progress = Persistence.getProofProgress(proof.id);
            const done = progress.completedSteps.length;
            html += `
              <li class="proof-item">
                <span class="proof-name">${_esc(proof.name)}</span>
                <span class="proof-status badge ${complete ? 'badge-success' : done > 0 ? 'badge-warning' : 'badge-muted'}">
                  ${complete ? 'Complete' : `${done}/${proof.steps.length} steps`}
                </span>
              </li>`;
          }
          html += `</ul>`;
        }

        html += `</div></div>`;
      }
    }

    container.innerHTML = html;
  }

  /**
   * Render the review session view.
   */
  function renderReview(container) {
    const cards = SpacedRepetition.getReviewSession(20);

    if (cards.length === 0) {
      container.innerHTML = `
        <div class="page-header">
          <h1>Review</h1>
        </div>
        <div class="empty-state">
          <div class="empty-icon">&#10003;</div>
          <p>No cards due for review right now. Great job!</p>
          <a href="#dashboard" class="btn btn-secondary">Back to Dashboard</a>
        </div>
      `;
      return;
    }

    let currentIndex = 0;

    function renderCard() {
      if (currentIndex >= cards.length) {
        container.innerHTML = `
          <div class="page-header"><h1>Review Complete</h1></div>
          <div class="empty-state">
            <div class="empty-icon">&#127881;</div>
            <p>You've reviewed all ${cards.length} due cards. Come back later for more.</p>
            <a href="#dashboard" class="btn btn-primary">Back to Dashboard</a>
          </div>
        `;
        return;
      }

      const card = cards[currentIndex];
      const remaining = cards.length - currentIndex;

      container.innerHTML = `
        <div class="page-header">
          <h1>Review Session</h1>
          <p>Card ${currentIndex + 1} of ${cards.length} &middot; ${remaining} remaining</p>
        </div>
        <div class="review-card card">
          <div class="card-header">
            <span class="review-type"><span class="tag">${_esc(card.definitionName)}</span></span>
            <span class="badge badge-info">${card.type === 'axiom' ? 'Axiom' : 'Definition Part'}</span>
          </div>
          <div class="card-body">
            <div class="review-prompt">${_esc(card.prompt)}</div>
            <div class="form-group">
              <textarea class="textarea-input" id="review-input" rows="4"
                placeholder="Type your answer..."></textarea>
            </div>
            <div class="exercise-actions">
              <button class="btn btn-primary" id="review-submit">Check</button>
              <button class="btn btn-secondary" id="review-reveal" style="display:none;">Show Reference</button>
            </div>
            <div id="review-feedback"></div>
            <div id="review-reference" style="display:none;margin-top:12px;">
              <div class="math-block">${_esc(card.reference)}</div>
            </div>
            <div id="review-next" style="display:none;margin-top:12px;">
              <button class="btn btn-primary" id="review-next-btn">Next Card</button>
            </div>
          </div>
        </div>
        <div class="progress-bar" style="margin-top: 16px;">
          <div class="progress-fill blue" style="width:${(currentIndex / cards.length) * 100}%"></div>
        </div>
      `;

      const submitBtn = container.querySelector('#review-submit');
      const revealBtn = container.querySelector('#review-reveal');
      const fbContainer = container.querySelector('#review-feedback');
      const refContainer = container.querySelector('#review-reference');
      const nextContainer = container.querySelector('#review-next');

      submitBtn.addEventListener('click', () => {
        const input = container.querySelector('#review-input').value.trim();
        if (!input) return;

        // Score
        const kwResult = Utils.keywordMatch(input, card.keywords || []);
        const simScore = Utils.slidingWindowSimilarity(input, card.reference);
        const score = kwResult.score * 0.6 + simScore * 0.4;
        const quality = SpacedRepetition.scoreToQuality(score);

        let mistakeType = null;
        if (score < 0.6) {
          mistakeType = kwResult.matched.length === 0 ? 'omission' : 'partial';
        }

        // Update spaced repetition
        SpacedRepetition.reviewCard(card.id, quality, mistakeType);

        // Update definition mastery
        Persistence.updateDefinitionMastery(card.courseId, card.definitionId, score);

        // Show feedback
        if (score >= 0.75) {
          fbContainer.innerHTML = `<div class="feedback correct">Excellent recall!</div>`;
        } else if (score >= 0.5) {
          fbContainer.innerHTML = `<div class="feedback partial">Partially recalled. Review the reference below.</div>`;
          revealBtn.style.display = '';
        } else {
          fbContainer.innerHTML = `<div class="feedback incorrect">Needs review. Check the reference below.</div>`;
          refContainer.style.display = '';
        }

        submitBtn.style.display = 'none';
        nextContainer.style.display = '';
      });

      revealBtn.addEventListener('click', () => {
        refContainer.style.display = '';
        revealBtn.style.display = 'none';
      });

      container.querySelector('#review-next-btn').addEventListener('click', () => {
        currentIndex++;
        renderCard();
      });
    }

    renderCard();
  }

  // ---- Helpers ----

  function _heatLevel(count) {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
  }

  function _esc(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }

  return {
    render,
    renderProgress,
    renderReview
  };
})();
