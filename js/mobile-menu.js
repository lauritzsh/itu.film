var mobileMenu = $('#mobile-menu-expand');
var nav = $('#nav');

mobileMenu.click(function() {
  nav.slideToggle();
  nav.toggleClass('is-expanded');
});
