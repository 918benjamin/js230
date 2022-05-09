$(function () {
  const $mainImage = $('figure img');

  $("ul").on('click', (event) => {
    let $thumbnail = $(event.target);

    if ($thumbnail.prop('tagName') !== 'IMG' || $thumbnail.hasClass('visible')) {
      return;
    }

    let url = $thumbnail.attr('src');
    $('.visible').removeClass('visible');
    $thumbnail.addClass('visible');

    let imgPromise = new Promise(resolve => {
      $mainImage.fadeOut(300);
      setTimeout(() => {
        resolve();
      }, 300);
    });

    imgPromise.then(() => {
      $mainImage.attr('src', url);
    }).then(() => {
      $mainImage.fadeIn('slow');
    }).catch(e => console.log(e));

  });
});