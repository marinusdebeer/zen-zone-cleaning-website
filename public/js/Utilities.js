(function attachUtilities(global) {
  if (!global || typeof global !== 'object') return;

  function debounce(func, wait) {
    let timeoutId;
    return function debounced(...args) {
      const context = this;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), wait);
    };
  }

  function getFormattedUserId() {
    try {
      const timePart = Date.now().toString(36);
      const randPart = Math.random().toString(36).slice(2, 10);
      return `zzc_${timePart}_${randPart}`;
    } catch (e) {
      return `zzc_${Math.random().toString(36).slice(2)}`;
    }
  }

  function initSessionAndUtm() {
    try {
      if (!global.sessionStorage.getItem('sessionId')) {
        const sid = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
        global.sessionStorage.setItem('sessionId', sid);
      }

      // Persist UTM and GCLID params for later reporting
      const params = new URLSearchParams(global.location.search || '');
      const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
      keys.forEach((key) => {
        const value = params.get(key);
        if (value) {
          try {
            global.localStorage.setItem(key, value);
          } catch (e) {}
        }
      });
    } catch (e) {}
  }

  const Utilities = { debounce, getFormattedUserId };

  // Initialize immediately on load
  try {
    initSessionAndUtm();
  } catch (e) {}

  global.Utilities = Utilities;
})(window);


