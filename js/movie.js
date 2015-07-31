var movie = $('#chappie');
var search = $('#search');
var movies = $('.movie');
var expanded = $('#movie-expanded-example');

movies.hover(function() {
  $(this).addClass('is-hovered');
}, function() {
  $(this).removeClass('is-hovered');
});

movies.click(function() {
  if (movie.is(this)) {
    expanded.slideToggle();
    expanded.removeClass('is-hidden');
  } else if(!movie.hasClass('is-hidden')) {
    expanded.slideUp();
    expanded.addClass('is-hidden');
  }
});

search.on('input', function() {
  expanded.hide();
});
