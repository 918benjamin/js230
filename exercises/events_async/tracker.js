let divRed = document.querySelector('#red');
let divBlue = document.querySelector('#blue');
let divOrange = document.querySelector('#orange');
let divGreen = document.querySelector('#green');

let tracker = function() {
  let list = [];
  return {
    list() {
      return list.slice();
    },

    elements() {
      return list.map(event => {
        return event.target;
      })
    },

    clear() {
      list = [];
      return list.length;
    },

    add(event) {
      if (!list.includes(event)) {
        list.push(event);
      };
    },
  }
}()

function track(trackCallback) {
  return function listenerCallback(event) {
    tracker.add(event);
    trackCallback(event);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  divRed.addEventListener('click', track(event => {
    document.body.style.background = 'red';
  }));

  divBlue.addEventListener('click', track(event => {
    event.stopPropagation();
    document.body.style.background = 'blue';
  }));

  divOrange.addEventListener('click', track(event => {
    document.body.style.background = 'orange';
  }));

  divGreen.addEventListener('click', track(event => {
    document.body.style.background = 'green';
  }));
})
