function cancelBooking(bookingID) {
  let request = new XMLHttpRequest();
  request.open('PUT', `/api/bookings/${bookingID}`);

  request.addEventListener('load', () => {
    switch (request.status) {
      case 204:
        alert('Booking canceled');
        break;
      case 404:
        alert(request.response);
        break;
    }
  });

  request.addEventListener('error', () => {
    alert(`Something went wrong: ${request.status}`)
  });

  request.send();
}

function cancelSchedule(scheduleID) {
  let request = new XMLHttpRequest();
  request.open('DELETE', `/api/schedules/${scheduleID}`);

  request.addEventListener('load', () => {
    switch (request.status) {
      case 204:
        alert('Schedule canceled');
        break;
      default:
        alert(request.response);
        break;
    }
  });

  request.addEventListener('error', () => {
    alert(`Something went wrong: ${request.status}`)
  });

  request.send();
}