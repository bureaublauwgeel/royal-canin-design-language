RCWDL.navigation = {};

/**
 * Changes all navigation bars on scroll
 *
 * @param {String} headerNavSelector Selector for the header navigation div 
 * 
 * @param {String} mobileFooterNavSelector Selector for the mobile footer navigation div
 * 
 * @param {String} mainNavSelector Selector for the main navigation div
 */
RCWDL.navigation.changeNavigationOnScroll = function (headerNavSelector, mobileFooterNavSelector, mainNavSelector) {
  'use strict';

  var headerNav = document.querySelector(headerNavSelector);

  if (headerNav !== null) {
    window.addEventListener('scroll', function () {
      var headerNav = document.querySelector(headerNavSelector);

      if (RCWDL.posTop() > 100) {
        headerNav.classList.add('scrolled');
      }
      else {
        headerNav.classList.remove('scrolled');
      }
    });
  }

  var footerNav = document.querySelector(mobileFooterNavSelector);
  var mainNav = document.querySelector(mainNavSelector);

  if (footerNav !== null) {
    var previous = window.scrollY;
    window.addEventListener('scroll', function () {

      if (window.scrollY > previous) {
        if (!mainNav.classList.contains('open')) {
          footerNav.classList.add('scrolled');
        }
      }
      else {
        footerNav.classList.remove('scrolled');
      }
      previous = window.scrollY;
    });
  }
};

RCWDL.ready(RCWDL.navigation.changeNavigationOnScroll('.rc-header-navigation', '.rc-mobile-footer-navigation', '.rc-main-navigation'));

/**
 * Hides and shows the search bar and shade, prevents duplicate shades showing when nav is open.
 *
 * @param {String} searchBarTriggerSelector Selector for the search bar trigger.
 * 
 * @param {String} mainNavSelector Selector for the main navigation wrapper.
 * 
 */
RCWDL.navigation.searchBar = function (searchBarTriggerSelector, mainNavSelector) {
  'use strict';

  var searchBarTrigger = document.querySelector(searchBarTriggerSelector);
  var mainNav = document.querySelector(mainNavSelector);

  if (mainNav != null) {
    searchBarTrigger.addEventListener('click', function () {
      if (RCWDL.utilities.hasClass(mainNav, 'open')) {
        mainNav.classList.remove('open');
      }
    });
  }

  RCWDL.ready(RCWDL.utilities.triggerAndTargetClassModifier.init('click', searchBarTriggerSelector, '[data-js-trigger]', '.open', null));
};

RCWDL.ready(RCWDL.navigation.searchBar('[data-js-trigger="search-bar"]', '.rc-main-navigation__wrapper'));

/**
 * Added toggle to svgs to target their internal svg/paths to trigger animations.
 *
 * @param {String} triggerSelector Css selector supplied for targeting the trigger elements.
 * 
 * @param {String} targetSelector Css selector supplied for targeting the target elements.
 * 
 */
RCWDL.navigation.burgerToggle = function (triggerSelector, targetSelector) {
  'use strict';

  var targets = document.querySelectorAll(triggerSelector);

  if (targets !== null) {
    Object.keys(targets).forEach(function (item) {
      targets[item].addEventListener('click', function (e) {
        e.target
          .querySelector(targetSelector)
          .contentDocument
          .querySelector('.svg-toggle')
          .classList.toggle('active');
      });
    });
  }
};

RCWDL.ready(RCWDL.navigation.burgerToggle('[data-js-animate-svg]', '[data-js-animate-svg-target]'));
