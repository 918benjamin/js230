const callback = ({target, currentTarget}) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};

const element1 = document.querySelector('table');
const element2 = document.querySelector('main h1');
const element3 = document.querySelector('main');

function delegateEvent(parentElement, selector, eventType, callback) {
  if (parentElement) {
    parentElement.addEventListener(eventType, event => {
      if (event.target.matches(selector) && event.target !== parentElement) {
        callback(event); 
      }
    })
    return true;
  }
}