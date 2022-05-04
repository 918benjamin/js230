$(function () {
  $("form").on("submit", function (event) {
    event.preventDefault();
    let char = $(this).find("input[type=text]").val();

    $(document).off('keypress').on('keypress', function (event) {
      if (event.key !== char) return;
      $('a').trigger('click');
    });
  });

  $("a").on("click", function (event) {
    event.preventDefault();
    $('#accordion').slideToggle(100);
  });
});