/* eslint-disable */
(function attachTracking(global) {
  if (!global || typeof global !== 'object') return;

  var Utilities = global.Utilities || {
    debounce: function (fn) { return fn; },
    getFormattedUserId: function () { return 'zzc_' + Math.random().toString(36).slice(2); }
  };

  var Tracking = (function () {
    var GOOGLE_SCRIPT_ID = 'AKfycbxWdax4Gb_8ejovXBuc1OowZh8P0Ii_nAQzBgzt-h4it54S2gN_k_sCiGRs9p-9xgXt';
    var endpoint = 'https://script.google.com/macros/s/' + GOOGLE_SCRIPT_ID + '/exec';
    var eventQueue = [];

    // Note: Apps Script only implements doPost; avoid GET pixel fallbacks

    function isValidFieldId(fieldId) {
      return /^[A-Za-z0-9_]+$/.test(String(fieldId || ''));
    }

    function sendData(fieldId, value) {
      try {
        if (!isValidFieldId(fieldId)) return Promise.resolve();
        var hostname = location.hostname;
        var userId = localStorage.getItem('userId') || Utilities.getFormattedUserId();
        localStorage.setItem('userId', userId);
        var sessionId = sessionStorage.getItem('sessionId');
        var gclid = localStorage.getItem('gclid') || '';
        var payload = JSON.stringify({ hostname: hostname, userId: userId, sessionId: sessionId, gclid: gclid, fieldId: fieldId, value: value });

        var piiKeys = ['name', 'firstName', 'lastName', 'email', 'phone'];
        if (piiKeys.indexOf(fieldId) !== -1) {
          try {
            if (global.posthog && global.posthog.people && global.posthog.people.set) {
              var obj = {}; obj[fieldId] = value; global.posthog.people.set(obj);
            }
          } catch (e) {}
        }

        return fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          keepalive: true,
          // Omit Content-Type to avoid CORS preflight; GAS can parse raw body
          body: payload,
        }).catch((err) => {
          console.error(`Tracking failed for ${fieldId}:`, err);
        });
      } catch (e) {
        // swallow
        return Promise.resolve();
      }
    }

    var sendDataDebounced = Utilities.debounce(sendData, 300);

    function queue(fieldId, value) {
      try {
        if (!isValidFieldId(fieldId)) return;
        eventQueue.push({ fieldId: fieldId, value: value });
      } catch (e) {}
    }

    function flush() {
      try {
        if (!eventQueue.length) return;
        // filter out any fields that won't exist as columns (e.g., contain ':')
        var safeEvents = eventQueue.filter(function (evt) { return isValidFieldId(evt.fieldId); });
        if (!safeEvents.length) { eventQueue = []; return; }

        var hostname = location.hostname;
        var userId = localStorage.getItem('userId') || Utilities.getFormattedUserId();
        localStorage.setItem('userId', userId);
        var sessionId = sessionStorage.getItem('sessionId');
        var gclid = localStorage.getItem('gclid') || '';
        var payload = JSON.stringify({ hostname: hostname, userId: userId, sessionId: sessionId, gclid: gclid, events: safeEvents });

        // clear the queue immediately so new events can start accumulating
        eventQueue = [];

        // use navigator.sendBeacon if available (it never blocks the UI)
        if (navigator.sendBeacon) {
          var blob = new Blob([payload], { type: 'text/plain;charset=UTF-8' });
          var ok = navigator.sendBeacon(endpoint, blob);
          if (ok) return;
        }

        // fallback to fetch without awaiting it
        fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          keepalive: true,
          body: payload,
        }).catch((err) => {
          console.error('Batch tracking failed:', err);
        });
      } catch (e) {}
    }

    function trackSubmitted() {
      try {
        var hostname = location.hostname;
        var userId = localStorage.getItem('userId') || Utilities.getFormattedUserId();
        localStorage.setItem('userId', userId);
        var sessionId = sessionStorage.getItem('sessionId');
        var gclid = localStorage.getItem('gclid') || '';
        var events = [{ fieldId: 'submitClicked', value: 'Submitted' }];
        var payload = JSON.stringify({ hostname: hostname, userId: userId, sessionId: sessionId, gclid: gclid, events: events });
        if (navigator.sendBeacon) {
          var blob = new Blob([payload], { type: 'text/plain;charset=UTF-8' });
          navigator.sendBeacon(endpoint, blob);
          return;
        }
        fetch(endpoint, { method: 'POST', mode: 'no-cors', keepalive: true, body: payload }).catch(function () {});
      } catch (e) {}
    }

    return { sendData: sendData, sendDataDebounced: sendDataDebounced, queue: queue, flush: flush, trackSubmitted: trackSubmitted };
  })();

  global.Tracking = Tracking;
})(window);


