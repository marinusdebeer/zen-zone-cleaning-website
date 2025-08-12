import { useEffect } from 'react';

// Analytics Configuration
const ANALYTICS_CONFIG = {
  // Set to false to enable PostHog on localhost for development/testing
  DISABLE_POSTHOG_ON_LOCALHOST: true,
  
  // Additional hostnames to exclude from PostHog (e.g., staging domains)
  EXCLUDED_HOSTNAMES: [
    '127.0.0.1',
    'localhost',
    // Add more hostnames here as needed
    // 'staging.example.com',
    // 'dev.example.com'
  ],
  
  // PostHog project token
  POSTHOG_TOKEN: 'phc_vJtgilJJj4Wu08WECgNrClemMoFdmi7Iw7ZvXS8XbP4',
  
  // Google Analytics ID
  GA_ID: 'G-8H1891ZW72'
};

/**
 * Analytics mounts once and loads third‑party analytics/chat integrations
 * (Google Analytics, PostHog, Tawk.to) in a non‑blocking way across the app.
 * Also persists UTM params and gclid to localStorage for attribution.
 */
export default function Analytics() {
  useEffect(() => {
    // Check if PostHog should be disabled
    const shouldDisablePostHog = () => {
      if (!ANALYTICS_CONFIG.DISABLE_POSTHOG_ON_LOCALHOST) return false;
      
      const hostname = window.location.hostname;
      return ANALYTICS_CONFIG.EXCLUDED_HOSTNAMES.includes(hostname);
    };

    // Persist UTM params and gclid
    try {
      const params = new URLSearchParams(window.location.search || '');
      const keys = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_content', 'utm_term', 'gclid'];
      keys.forEach((key) => {
        const value = params.get(key);
        if (value) {
          try {
            window.localStorage.setItem(key, value);
          } catch {}
        }
      });
    } catch {}

    const loadVendors = () => {
      // Google Analytics (gtag) - Load only after user interaction for performance
      try {
        if (!window.gtag) {
          const loadGA = () => {
            const ga = document.createElement('script');
            ga.async = true;
            ga.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA_ID}`;
            document.head.appendChild(ga);
            ga.onload = () => {
              window.dataLayer = window.dataLayer || [];
              function gtag() { window.dataLayer.push(arguments); }
              // @ts-ignore
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', ANALYTICS_CONFIG.GA_ID);
            };
          };

          // Load on first user interaction or after 5 seconds
          const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
          const loadOnce = () => {
            loadGA();
            events.forEach(event => document.removeEventListener(event, loadOnce, true));
          };
          events.forEach(event => document.addEventListener(event, loadOnce, { once: true, passive: true }));
          setTimeout(loadGA, 5000); // Fallback after 5 seconds
        }
      } catch {}

      // PostHog
      try {
        if (!window.posthog && !shouldDisablePostHog()) {
          (function (t, e) {
            let o, n, p, r; e.__SV || ((window.posthog = e), (e._i = []), (e.init = function (i, s, a) {
              function g(t2, e2) { const o2 = e2.split('.'); 2 === o2.length && ((t2 = t2[o2[0]]), (e2 = o2[1])); t2[e2] = function () { t2.push([e2].concat(Array.prototype.slice.call(arguments, 0))); }; }
              p = t.createElement('script'); p.type = 'text/javascript'; p.async = true; p.crossOrigin = 'anonymous';
              p.src = s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js';
              r = t.getElementsByTagName('script')[0]; r.parentNode.insertBefore(p, r);
              let u = e; void 0 !== a ? (u = e[a] = []) : (a = 'posthog'); u.people = u.people || [];
              u.toString = function (t2) { let e2 = 'posthog'; return 'posthog' !== a && (e2 += '.' + a), t2 || (e2 += ' (stub)'), e2; };
              u.people.toString = function () { return u.toString(1) + '.people (stub)'; };
              o = 'init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId'.split(' ');
              for (n = 0; n < o.length; n++) g(u, o[n]); e._i.push([i, s, a]); }), (e.__SV = 1));
          })(document, window.posthog || []);
          window.posthog.init(ANALYTICS_CONFIG.POSTHOG_TOKEN, {
            api_host: 'https://us.i.posthog.com',
            // Disable session recording for now to avoid noisy console errors
            disable_session_recording: false,
            person_profiles: 'always',
          });
          window.posthog.onFeatureFlags(function () {
            if (window.posthog.get_distinct_id && window.posthog.get_distinct_id() === '0194bd19-58dc-7531-96c9-aa11544a3415') {
              // window.posthog.stopSessionRecording && window.posthog.stopSessionRecording();
            }
          });
          window.posthog.register({ site_domain: window.location.hostname });
          if (window.posthog.identify && window.posthog.get_distinct_id) {
            window.posthog.identify(window.posthog.get_distinct_id(), { site_domain: window.location.hostname });
          }
        } else if (shouldDisablePostHog()) {
          console.log('PostHog disabled on localhost/excluded hostname:', window.location.hostname);
        }
      } catch {}

      // Also trigger Tawk load immediately
      try { loadTawk(); } catch {}
    };

    // --- Tawk loader (immediate + retries) ---
    function loadTawk() {
      try {
        const ensureTawk = () => {
          return !!(window.Tawk_API && document.querySelector('iframe[src*="tawk.to"]'));
        };

        const injectTawk = () => {
          if (document.getElementById('tawk-script') || ensureTawk()) return;
          window.Tawk_API = window.Tawk_API || {};
          window.Tawk_LoadStart = new Date();
          window.Tawk_API.onLoad = function () {
            try {
              const attrs = {
                utm_campaign: localStorage.getItem('utm_campaign') || undefined,
                utm_source: localStorage.getItem('utm_source') || undefined,
                utm_medium: localStorage.getItem('utm_medium') || undefined,
                utm_content: localStorage.getItem('utm_content') || undefined,
                utm_term: localStorage.getItem('utm_term') || undefined,
                gclid: localStorage.getItem('gclid') || undefined,
                site_domain: window.location.hostname,
              };
              window.Tawk_API.setAttributes && window.Tawk_API.setAttributes(attrs, function () {});
            } catch {}
          };
          const s1 = document.createElement('script');
          s1.id = 'tawk-script';
          s1.async = true;
          s1.src = 'https://embed.tawk.to/65fafd4ea0c6737bd122e1cd/1hpe6qv15';
          s1.charset = 'UTF-8';
          s1.setAttribute('crossorigin', '*');
          const s0 = document.getElementsByTagName('script')[0];
          if (s0 && s0.parentNode) {
            s0.parentNode.insertBefore(s1, s0);
          } else {
            document.head.appendChild(s1);
          }
        };

        injectTawk();
        // retries at 2.5s, 5s, 10s
        const schedule = [2500, 5000, 10000];
        schedule.forEach((ms) => setTimeout(() => { if (!document.getElementById('tawk-script') && !document.querySelector('iframe[src*="tawk.to"]')) injectTawk(); }, ms));
      } catch {}
    }
    // Significantly delay analytics for critical performance metrics
    const timer = setTimeout(() => {
      loadVendors();
      loadTawk();
    }, 3000); // Increased delay to 3 seconds for better LCP/FCP

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return null;
}


