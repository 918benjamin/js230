// Get all of the photos
  // GET request /photos => returns an array of photo objects
// get comments for a photo
  // GET request /comments?photo_id=X => returns array of comment objects
    // render these comments using the handlebars each loop
      // pass in the photos object and comments object
      // specific photo needs to be passed in
// New comment creates a POST request to /comments/new
  // Then load that comment

// On page load, ajax call to get comments for first photo
// When photo advances:
  // ajax call to get photo_comments for that photo
    // handlebars template for photo_comments iterates through
  // replace the photo_information in the handlebars template

// button click on likes or favorites
  // post request to
    // photos/like?photo_id=X
    // photos/favorite?photo_id=X
  // get back a number to replace as json object (total property)
    // replace the new total in the template


document.addEventListener('DOMContentLoaded', () => {
  const templates = {};
  let photos;

  const slideshow = {
    prevSlide(e) {
      e.preventDefault();
      let prev = this.currentSlide.previousElementSibling;
      if (!prev) {
        prev = this.lastSlide;
      }
      this.fadeOut(this.currentSlide);
      this.fadeIn(prev);
      this.renderPhotoContent(prev.dataset.id);
      this.currentSlide = prev;
    },

    nextSlide(e) {
      e.preventDefault();
      let next = this.currentSlide.nextElementSibling;
      if (!next) {
        next = this.firstSlide;
      }
      this.fadeOut(this.currentSlide);
      this.fadeIn(next);
      this.renderPhotoContent(next.dataset.id);
      this.currentSlide = next;
    },

    fadeOut(slide) {
      slide.classList.add('hide');
      slide.classList.remove('show');
    },

    fadeIn(slide) {
      slide.classList.remove('hide');
      slide.classList.add('show');
    },

    renderPhotoContent(index) {
      renderPhotoInformation(Number(index));
      getCommentsFor(index);
    },

    bind() {
      let prevButton = this.slideshow.querySelector('a.prev');
      let nextButton = this.slideshow.querySelector('a.next');
      prevButton.addEventListener('click', e => this.prevSlide(e));
      nextButton.addEventListener('click', e => this.nextSlide(e));
    },

    init() {
      this.slideshow = document.querySelector("#slideshow");
      let slides = this.slideshow.querySelectorAll('figure');
      this.firstSlide = slides[0];
      this.lastSlide = slides[slides.length - 1];
      this.currentSlide = this.firstSlide;
      this.bind();
    },
  }

  const actions = {

    bind() {

    },

    init() {

    },
  }

  document.querySelectorAll('script[type="text/x-handlebars"]').forEach(tmpl => {
    templates[tmpl.id] = Handlebars.compile(tmpl.innerHTML);
  });

  document.querySelectorAll("[data-type=partial]").forEach(partial => {
    Handlebars.registerPartial(partial.id, partial.innerHTML);
  });

  fetch("/photos")
    .then(response => response.json())
    .then(json => {
      photos = json;
      renderPhotos();
      renderPhotoInformation(photos[0].id);
      getCommentsFor(photos[0].id);
      slideshow.init();
    });
  
  function renderPhotos() {
    let slidesDiv = document.getElementById('slides');
    slidesDiv.innerHTML = templates.photos({photos: photos});
  }

  function renderPhotoInformation(id) {
    let photo = photos.filter(photoData => {
      return photoData.id === id;
    })[0];

    let header = document.querySelector('section > header');
    header.innerHTML = templates.photo_information(photo);
  }

  function getCommentsFor(index) {
    fetch(`/comments?photo_id=${index}`)
      .then(response => response.json())
      .then(json => {
        let ul = document.querySelector('#comments > ul');
        ul.innerHTML = templates.photo_comments({comments: json});
      });
  }

  document.querySelector('section > header').addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      let button = e.target;
      let photo_id = Number(button.dataset.id);

      fetch(button.getAttribute('href'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({photo_id: photo_id}),
      })
        .then(response => response.json())
        .then(json => {
          let words = button.innerText.split(' ');
          words[1] = json.total;
          button.innerText = words.join(' ');
        })
    }
  });
});