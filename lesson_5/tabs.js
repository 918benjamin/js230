$(function() {
  $('a').on('click', function(event) {
    event.preventDefault();

    $('article').hide().filter(`[data-block=${$(this).attr('data-block')}]`).show();
  });
});