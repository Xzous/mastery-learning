// ============================================================
// router.js — Hash-based SPA routing
// ============================================================
window.Router = (() => {
  const routes = {};
  let currentRoute = null;
  let currentCleanup = null;

  /**
   * Register a route pattern and its handler.
   * Pattern supports :param placeholders, e.g. "topic/:courseId/:topicId"
   */
  function register(pattern, handler) {
    routes[pattern] = handler;
  }

  /**
   * Navigate to a hash route.
   */
  function navigate(hash) {
    if (!hash.startsWith('#')) hash = '#' + hash;
    window.location.hash = hash;
  }

  /**
   * Parse hash and match against registered routes.
   */
  function _matchRoute(hash) {
    const path = hash.replace(/^#\/?/, '').replace(/\/$/, '') || 'dashboard';
    const segments = path.split('/');

    for (const [pattern, handler] of Object.entries(routes)) {
      const patternSegments = pattern.split('/');
      if (patternSegments.length !== segments.length) continue;

      const params = {};
      let match = true;

      for (let i = 0; i < patternSegments.length; i++) {
        if (patternSegments[i].startsWith(':')) {
          params[patternSegments[i].slice(1)] = decodeURIComponent(segments[i]);
        } else if (patternSegments[i] !== segments[i]) {
          match = false;
          break;
        }
      }

      if (match) return { handler, params, pattern };
    }
    return null;
  }

  /**
   * Handle route change.
   */
  function _onHashChange() {
    const hash = window.location.hash || '#dashboard';
    const match = _matchRoute(hash);

    // Run cleanup for previous route
    if (currentCleanup && typeof currentCleanup === 'function') {
      currentCleanup();
      currentCleanup = null;
    }

    const container = document.getElementById('main-content');
    if (!container) return;

    if (match) {
      currentRoute = match.pattern;
      // Update active nav
      _updateNav(hash);
      // Call handler, which may return a cleanup function
      currentCleanup = match.handler(container, match.params) || null;
    } else {
      container.innerHTML = `
        <div class="page-header">
          <h1>Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
        </div>
        <a href="#dashboard" class="btn btn-primary">Go to Dashboard</a>
      `;
    }
  }

  /**
   * Update active state on nav links.
   */
  function _updateNav(hash) {
    const links = document.querySelectorAll('.sidebar-nav a, .sidebar-course a');
    const path = hash.replace(/^#\/?/, '');

    links.forEach(link => {
      const href = (link.getAttribute('href') || '').replace(/^#\/?/, '');
      if (path === href || (path.startsWith(href + '/') && href.length > 0)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Initialize the router.
   */
  function init() {
    window.addEventListener('hashchange', _onHashChange);
    // Initial route
    _onHashChange();
  }

  /**
   * Get the current route info.
   */
  function getCurrentRoute() {
    const hash = window.location.hash || '#dashboard';
    return _matchRoute(hash);
  }

  return {
    register,
    navigate,
    init,
    getCurrentRoute
  };
})();
