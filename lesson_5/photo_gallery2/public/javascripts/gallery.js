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
  // ajax request for JSON data of all photos
  // then, render photos template
    // write rendered template to #slides div
  // render photo_information template using first photo data
    // write rendered template to section > header
  const templates = {};
  let photos;

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
});