function retrieveSchedules() {
  let request = new XMLHttpRequest();

  request.open('GET', '/api/schedules');
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', event => {
    let request = event.target;
    let data = request.response;
    let userMessage;

    if (data.length === 0) {
      userMessage = 'There are currently no schedules available for booking';
    } else {
      let staff = {};

      data.forEach(schedule => {
        let id = schedule.staff_id;
        if (!staff[id]) { staff[id] = 0 };
        staff[id] += 1;
      })

      userMessage = Object.keys(staff).map(id => {
        return `Staff ${id}: ${staff[id]}`
      }).join('\n');
    }

    alert(userMessage);
  });

  request.addEventListener('error', event => {
    let request = event.target;
    alert(`Something went wrong. Response code:${request.status}`);
  });

  request.addEventListener('timeout', event => {
    alert('Your request timed out. Please try again.')
  });

  request.addEventListener('loadend', event => {
    alert(`The request has been completed. Status: ${request.status}`);
  });

  request.send();
}

document.addEventListener('DOMContentLoaded', () => {
  let button = document.querySelector('button');
  button.addEventListener('click', event => {
    retrieveSchedules();
  })
});