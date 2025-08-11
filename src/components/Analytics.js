import { useEffect } from 'react';

/**
 * Analytics mounts once and loads third‑party analytics/chat integrations
 * (Google Analytics, PostHog, Tawk.to) in a non‑blocking way across the app.
 * Also persists UTM params and gclid to localStorage for attribution.
 */
export default function Analytics() {
  useEffect(() => {
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

    const onIdle = (fn) => {
      if ('requestIdleCallback' in window) {
        // @ts-ignore
        window.requestIdleCallback(fn, { timeout: 2000 });
      } else {
        window.addEventListener('load', () => setTimeout(fn, 300));
      }
    };

    onIdle(() => {
      // Google Analytics (gtag)
      try {
        if (!window.gtag) {
          const ga = document.createElement('script');
          ga.async = true;
          ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-8H1891ZW72';
          document.head.appendChild(ga);
          ga.onload = () => {
            window.dataLayer = window.dataLayer || [];
            function gtag() { window.dataLayer.push(arguments); }
            // @ts-ignore
            window.gtag = gtag;
            gtag('js', new Date());
            if ('requestIdleCallback' in window) {
              // @ts-ignore
              window.requestIdleCallback(() => gtag('config', 'G-8H1891ZW72'));
            } else {
              setTimeout(() => gtag('config', 'G-8H1891ZW72'), 300);
            }
          };
        }
      } catch {}

      // PostHog
      try {
        if (!window.posthog || !window.posthog.__loaded) {
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
          window.posthog.init('phc_owjzFx1YRrgDgk83WSitkE7VW6va3VwHXPaB7esRzzR', {
            api_host: 'https://us.i.posthog.com',
            disable_session_recording: window.location.hostname === 'localhost',
            person_profiles: 'always',
          });
          window.posthog.onFeatureFlags(function () {
            if (window.posthog.get_distinct_id && window.posthog.get_distinct_id() === '0194bd19-58dc-7531-96c9-aa11544a3415') {
              window.posthog.stopSessionRecording && window.posthog.stopSessionRecording();
            }
          });
          window.posthog.register({ site_domain: window.location.hostname });
          if (window.posthog.identify && window.posthog.get_distinct_id) {
            window.posthog.identify(window.posthog.get_distinct_id(), { site_domain: window.location.hostname });
          }
        }
      } catch {}

      // Tawk.to chat widget
      try {
        if (!document.getElementById('tawk-script') && !window.Tawk_API) {
          const s = document.createElement('script');
          s.id = 'tawk-script';
          s.async = true;
          s.src = 'https://embed.tawk.to/65fafd4ea0c6737bd122e1cd/1hpe6qv15';
          s.charset = 'UTF-8';
          s.setAttribute('crossorigin', '*');
          document.body.appendChild(s);
        }
      } catch {}
    });
  }, []);

  return null;
}


