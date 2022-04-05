let cursorInterval;
let focusedTextField;

document.addEventListener('DOMContentLoaded', () => {
  let textField = document.querySelector('.text-field');

  textField.addEventListener('click', function(event) {
    event.stopPropagation();

    focusedTextField = textField;
    textField.classList.add('focused');
    
    if (!cursorInterval) {
     cursorInterval = setInterval(() => textField.classList.toggle('cursor'), 500); 
    }
  });
});

document.addEventListener('keydown', event => {
  if (focusedTextField) {
    let contentDiv = focusedTextField.querySelector('.content');
    if (event.key === 'Backspace') {
      contentDiv.textContent = contentDiv.textContent.slice(0, -1);
    } else {
     contentDiv.textContent += event.key; 
    }
  }
});

document.addEventListener('click', event => {
  clearInterval(cursorInterval);
  if (focusedTextField) {
    focusedTextField.classList.remove('focused');
    focusedTextField.classList.remove('cursor');
    focusedTextField = null;
  }
});