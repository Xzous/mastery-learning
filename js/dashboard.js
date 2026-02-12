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

  // ==================== REVIEW (Duolingo-style MC) ====================

  function renderReview(container) {
    const cards = SpacedRepetition.getReviewSession(20);
    _updateBadge(cards.length);

    if (cards.length === 0) {
      _clearActionBar();
      container.innerHTML = `<div class="empty-state animate-slide-up">
        <div class="empty-icon">&#127881;</div>
        <h2>All caught up!</h2>
        <p>No cards due for review right now. Nice work!</p>
        <a href="#dashboard" class="btn btn-primary" style="display:inline-flex;">Back to Learning</a>
      </div>`;
      return;
    }

    // Group due cards by definition, then build MC questions from each def's exercises
    const defGroups = {};
    for (const card of cards) {
      const key = card.courseId + ':' + card.definitionId;
      if (!defGroups[key]) {
        defGroups[key] = { courseId: card.courseId, definitionId: card.definitionId, definitionName: card.definitionName, cards: [] };
      }
      defGroups[key].cards.push(card);
    }

    const reviewQuestions = [];
    for (const key of Object.keys(defGroups)) {
      const group = defGroups[key];
      const def = ContentRegistry.getDefinition(group.courseId, group.definitionId);
      if (!def || !def.exercises || def.exercises.length === 0) continue;

      // Pick exercises proportional to due cards (at least 1, at most def.exercises.length)
      const available = def.exercises.filter(ex => ex.choices && ex.choices.length > 0);
      if (available.length === 0) continue;

      const count = Math.min(Math.max(1, Math.ceil(group.cards.length / 2)), available.length);
      const picked = _shuffleArr(available.slice()).slice(0, count);

      for (const ex of picked) {
        reviewQuestions.push({
          courseId: group.courseId,
          definitionId: group.definitionId,
          definitionName: group.definitionName,
          srCards: group.cards,
          prompt: ex.prompt,
          choices: ex.choices,
          correctIndex: ex.correctIndex,
          explanation: ex.explanation || ''
        });
      }
    }

    _shuffleArr(reviewQuestions);

    if (reviewQuestions.length === 0) {
      _clearActionBar();
      container.innerHTML = `<div class="empty-state animate-slide-up">
        <div class="empty-icon">&#128218;</div>
        <h2>No review exercises available</h2>
        <p>Complete some lessons first to build your review deck.</p>
        <a href="#dashboard" class="btn btn-primary" style="display:inline-flex;">Back to Learning</a>
      </div>`;
      return;
    }

    let idx = 0;
    let correct = 0;
    const total = reviewQuestions.length;

    function showQuestion() {
      if (idx >= total) {
        _showReviewComplete(container, correct, total);
        return;
      }

      const q = reviewQuestions[idx];
      const pct = Math.round((idx / total) * 100);

      // Shuffle choices while tracking correct answer
      const shuffled = q.choices.map((text, origIdx) => ({ text, origIdx }));
      _shuffleArr(shuffled);
      const shuffledCorrectIdx = shuffled.findIndex(c => c.origIdx === q.correctIndex);

      container.innerHTML = `
        <div class="animate-slide-up">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
            <a href="#dashboard" class="back-btn" style="text-decoration:none;">
              <span class="arrow">&#10005;</span>
            </a>
            <div class="lesson-progress" style="flex:1;max-width:none;">
              <div class="lesson-progress-fill" style="width:${pct}%"></div>
            </div>
            <span style="font-size:14px;font-weight:700;color:var(--text-secondary);">${idx + 1}/${total}</span>
          </div>
        </div>
        <div class="slide-counter" style="margin-bottom:4px;">${_esc(q.definitionName)}</div>
        <div class="lesson-card animate-slide-up" style="animation-delay:0.05s;">
          <div class="lesson-prompt">${_esc(q.prompt)}</div>
          <div class="mc-choices" id="mc-choices">
            ${shuffled.map((c, i) => `
              <button class="mc-tile" data-index="${i}">
                <span class="mc-letter">${String.fromCharCode(65 + i)}</span>
                <span class="mc-text">${_esc(c.text)}</span>
              </button>
            `).join('')}
          </div>
        </div>
        <div id="review-feedback"></div>
      `;

      _renderMath(container);

      let selectedIndex = null;

      _setActionBar(`
        <button class="btn btn-check" id="review-check" disabled>Check</button>
      `);

      // Wire tile selection
      container.querySelectorAll('.mc-tile').forEach(tile => {
        tile.addEventListener('click', () => {
          if (tile.classList.contains('locked')) return;
          container.querySelectorAll('.mc-tile').forEach(t => t.classList.remove('selected'));
          tile.classList.add('selected');
          selectedIndex = parseInt(tile.dataset.index);
          document.getElementById('review-check').disabled = false;
        });
      });

      document.getElementById('review-check').addEventListener('click', () => {
        if (selectedIndex === null) return;

        const isCorrect = selectedIndex === shuffledCorrectIdx;
        const score = isCorrect ? 1.0 : 0.0;
        const quality = SpacedRepetition.scoreToQuality(score);
        const mistakeType = isCorrect ? null : 'partial';

        // Update all SR cards for this definition
        for (const card of q.srCards) {
          SpacedRepetition.reviewCard(card.id, quality, mistakeType);
        }
        Persistence.updateDefinitionMastery(q.courseId, q.definitionId, score);
        if (!isCorrect) {
          const def = ContentRegistry.getDefinition(q.courseId, q.definitionId);
          if (def) Persistence.recordError(q.courseId, def._topicId, 'partial');
        }

        if (isCorrect) correct++;

        // Lock tiles and highlight
        container.querySelectorAll('.mc-tile').forEach(t => {
          t.classList.add('locked');
          if (parseInt(t.dataset.index) === shuffledCorrectIdx) t.classList.add('correct');
          if (parseInt(t.dataset.index) === selectedIndex && !isCorrect) t.classList.add('incorrect');
        });

        // Feedback
        const fb = container.querySelector('#review-feedback');
        if (isCorrect) {
          fb.innerHTML = `<div class="feedback-bar correct animate-slide-up">
            <span class="feedback-icon">&#127881;</span>
            <div>${_randomPraise()}</div>
          </div>`;
          _setActionBar(`
            <button class="btn btn-continue correct-btn" id="review-next">Continue</button>
          `);
        } else {
          fb.innerHTML = `<div class="feedback-bar incorrect animate-slide-up">
            <span class="feedback-icon">&#128161;</span>
            <div>
              Correct answer: ${_esc(q.choices[q.correctIndex])}
              ${q.explanation ? '<div class="feedback-detail">' + _esc(q.explanation) + '</div>' : ''}
            </div>
          </div>`;
          _setActionBar(`
            <button class="btn btn-continue incorrect-btn" id="review-next">Got It</button>
          `);
        }

        _renderMath(fb);
        document.getElementById('review-next').addEventListener('click', () => {
          idx++;
          showQuestion();
        });
      });
    }

    showQuestion();
  }

  function _showReviewComplete(container, correct, total) {
    _clearActionBar();
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    let icon = '&#128218;';
    let title = 'Keep practicing!';
    if (pct >= 90) { icon = '&#127942;'; title = 'Amazing!'; }
    else if (pct >= 70) { icon = '&#128170;'; title = 'Great job!'; }
    else if (pct >= 50) { icon = '&#128077;'; title = 'Good effort!'; }

    container.innerHTML = `<div class="completion-screen animate-bounce">
      <div class="completion-icon">${icon}</div>
      <div class="completion-title">${title}</div>
      <div class="completion-subtitle">Review Complete — ${total} questions</div>
      <div class="completion-stats">
        <div class="completion-stat">
          <div class="completion-stat-value">${pct}%</div>
          <div class="completion-stat-label">Accuracy</div>
        </div>
        <div class="completion-stat">
          <div class="completion-stat-value">${correct}/${total}</div>
          <div class="completion-stat-label">Correct</div>
        </div>
      </div>
      <a href="#dashboard" class="btn btn-primary" style="display:inline-flex;">Continue</a>
    </div>`;
  }

  // ==================== REVIEW HELPERS ====================

  function _shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function _randomPraise() {
    const phrases = ['Excellent!', 'Well done!', 'Nailed it!', 'Perfect!', 'Spot on!', 'Great recall!', 'Impressive!'];
    return phrases[Math.floor(Math.random() * phrases.length)];
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

  return { render, renderReview, renderProgress, _setActionBar, _clearActionBar };
})();
