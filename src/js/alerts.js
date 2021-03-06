RCDL.features.alerts = {

  /**
   * Add the default functionality for alerts. Remove alert if close button clicked.
   * Store this decision in the local session and hide the alerts if they've already been closed.
   *
   * @param {String|Array} selectors
   * Either a css selector or an array or selectors.
   */
  init: function (selectors) {
    'use strict';

    if (typeof selectors === 'string') {
      selectors = [selectors];
    }

    selectors.forEach(function (selector) {
      var alerts = document.querySelectorAll(selector);

      if (alerts) {
        alerts.forEach(function (alert) {

          if (sessionStorage.getItem(String(alert.innerHTML)) !== null) {
            alert.remove();
          }

          var alertClose = alert.querySelector('.alert__close');

          if (alertClose) {
            alertClose.addEventListener('click', function (event) {
              sessionStorage.setItem(String(event.currentTarget.parentNode.innerHTML), String(event.currentTarget.parentNode.innerHTML));
              event.currentTarget.parentNode.remove();
            });
          }
        });
      }
    });
  }
};

RCDL.ready(RCDL.features.alerts.init(['[role="alert"]']));
