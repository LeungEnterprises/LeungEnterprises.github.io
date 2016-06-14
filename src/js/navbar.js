/**
 * navbar.js
 * Sets up navbar changes based on scroll distance
 */
$(document).ready(() => {
  // Initial selector for the navbar
  const NAV_SELECTOR = 'nav.navbar-inverse';
  // Class to add/remove upon reaching the change point
  const CHANGE_CLASS = 'navbar-unscrolled';
  // Point (in px) where navbar will change
  let CHANGE_POINT =
    $('.jumbotron-header').innerHeight() - $(NAV_SELECTOR).innerHeight();
    
  // Don't change on homepage
  if ($('body').hasClass('home')) {
    CHANGE_POINT = 9999;
  }
  checkNavClass();
  $(window).scroll(() => {
    checkNavClass();
  });
  function checkNavClass() {
    const $navbar = $(NAV_SELECTOR);
    if ($(window).scrollTop() < CHANGE_POINT) {
      if (!$navbar.hasClass(CHANGE_CLASS)) {
        $navbar.addClass(CHANGE_CLASS);
      }
    } else {
      if ($navbar.hasClass(CHANGE_CLASS)) {
        $navbar.removeClass(CHANGE_CLASS);
      }
    }
  }
});