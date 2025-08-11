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

    // Only allow columns that exist in the sheet to avoid write failures
    var allowedFields = {
      userId: 1, sessionId: 1, firstSeen: 1, lastSeen: 1, openedBookingForm: 1, name: 1, gclid: 1,
      firstName: 1, lastName: 1, company: 1, email: 1, phone: 1, industry: 1, propertyType: 1,
      reason: 1, bookingType: 1, frequency: 1, firstTimeDeepCleaning: 1, serviceType: 1,
      squareFootage: 1, levels: 1, kitchens: 1, bedrooms: 1, bathrooms: 1, powderRooms: 1,
      builtYear: 1, lastRenovated: 1, lastCleaned: 1, pets: 1, people: 1, furnished: 1, basement: 1, extras: 1,
      interiorWindows: 1, insideEmptyKitchenCabinets: 1, package: 1, price: 1, address: 1, city: 1,
      province: 1, postal: 1, accessMethod: 1, accessDetails: 1, date: 1, details: 1,
      hearAbout: 1, referralName: 1, images: 1, submitClicked: 1,
      utm_campaign: 1, utm_source: 1, utm_medium: 1, utm_content: 1, utm_term: 1
    };

    function isValidFieldId(fieldId) {
      var key = String(fieldId || '');
      return Object.prototype.hasOwnProperty.call(allowedFields, key);
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
        // support an override batch (used by desktop step jump / next step batching)
        var batch = (typeof global.Tracking !== 'undefined' && global.Tracking._q) || eventQueue;
        if (!batch.length) return;
        var safeEvents = batch.filter(function (evt) { return isValidFieldId(evt.fieldId); });
        if (!safeEvents.length) { if (batch === eventQueue) { eventQueue = []; } return; }

        var hostname = location.hostname;
        var userId = localStorage.getItem('userId') || Utilities.getFormattedUserId();
        localStorage.setItem('userId', userId);
        var sessionId = sessionStorage.getItem('sessionId');
        var gclid = localStorage.getItem('gclid') || '';
        var payload = JSON.stringify({ hostname: hostname, userId: userId, sessionId: sessionId, gclid: gclid, events: safeEvents });

        // clear the queue immediately so new events can start accumulating
        if (batch === eventQueue) {
          eventQueue = [];
        } else {
          // external batch: do not touch the internal queue
        }

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

    // Removed separate submit beacon to avoid creating a separate row

    return { sendData: sendData, sendDataDebounced: sendDataDebounced, queue: queue, flush: flush };
  })();

  global.Tracking = Tracking;
})(window);


