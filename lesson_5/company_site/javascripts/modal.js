const TEAM_DATA = {
  chris: {
    fullName: 'Chris Lee',
    img: './images/img_chris.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },

  kasper: {
    fullName: 'Kasper Salto',
    img: './images/img_kasper.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },

  louis: {
    fullName: 'Louis Burton',
    img: './images/img_louis.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },

  kevin: {
    fullName: 'Kevin Wang',
    img: './images/img_kevin.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
}

$(function () {
  $('.modal-close').on('click', (event) => {
    $('#modal').fadeOut(100);
  });

  $('#modal').on('click', (event) => {
    if (event.target === event.currentTarget) {
      $('#modal').fadeOut(100);
    }
  });

  $('a.team').on('click', (event) => {
    event.preventDefault();

    const $modalContent = $('.modal-content');
    const $img = $($modalContent).find('.person');
    const $h3 = $($modalContent).find('h3');
    const $bio = $($modalContent).find('p');
    const name = event.currentTarget.dataset.teamMember;
    const data = TEAM_DATA[name];

    $img.attr('src', data.img);
    $h3.text(data.fullName);
    $bio.text(data.bio);

    $('#modal').fadeIn(300);

  });
});