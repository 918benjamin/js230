// When the form is submitted
// check to see if both inputs are given:
  // if so, send request to create new staff + alert success
  // if not, alert staff can't be created
document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    let formData = new FormData(form);
    let email = formData.get('email');
    let name = formData.get('name');

    if (!email || !name) {
      alert('Staff can not be created. Check your inputs');
      return;
    }

    let request = new XMLHttpRequest();
    request.open('POST', '/api/staff_members');
    request.responseType = 'json';

    request.addEventListener('load', event => {
      let id = request.response.id;
      alert(`Successfully created staff with id: ${id}`);
    });

    request.addEventListener('error', event => {
      alert(`There was some kind of error. Status: ${request.status}`);
    });

    request.send(formData);
  })
});