// When the form is submitted
// check to see if both inputs are given:
  // if so, send request to create new staff + alert success
  // if not, alert staff can't be created
document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');

  form.addEventListener('submit', event => {
    event.preventDefault();
    let formData = new FormData(form);

    let request = new XMLHttpRequest();
    request.open('POST', '/api/staff_members');

    request.addEventListener('load', () => {
      if (request.status === 400) {
        alert(request.response);
      } else {
        let data = JSON.parse(request.response);
        let id = data.id;
        alert(`Successfully created staff with id: ${id}`);
        form.reset();
      }
    });

    request.addEventListener('error', event => {
      alert(`There was some kind of error. Status: ${request.status}`);
    });

    request.send(formData);
  })
});