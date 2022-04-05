function validInt(string) {
  return String(parseInt(string, 10)) === string;
}

document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('form');
  let input = document.querySelector('#guess');
  let paragraph = document.querySelector('p');
  let link = document.querySelector('a');
  let button = input.nextElementSibling;
  let answer;
  let guesses;

  function newGame() {
    answer = Math.floor(Math.random() * 100) + 1;
    guesses = 0;
    paragraph.textContent = 'Guess a number from 1 to 100';
    button.disabled = false;
  }
  
  form.addEventListener('submit', event => {
    event.preventDefault();

    let guess = parseInt(input.value, 10);
    let message;

    guesses += 1;
    
    if (guess === answer) {
      message = `You guessed it! It took you ${guesses} guesses.`;
      button.disabled = true;
    } else if (guess > answer) {
      message = `My number is lower than ${guess}`;
    } else {
      message = `My number is higher than ${guess}`;
    }
    
    paragraph.textContent = message;
  });

  link.addEventListener('click', event => {
    event.preventDefault();
    newGame();
  });
  
  input.addEventListener('input', event => {
    if (!validInt(event.currentTarget.value) && event.currentTarget.value !== '') {
      paragraph.textContent = 'Please enter a valid integer';
    }
  })
  
  newGame();
});