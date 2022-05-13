"use strict";

document.addEventListener('DOMContentLoaded', () => {
  const apples = document.getElementById("apples");
  const message = document.getElementById("message");
  const replay = document.getElementById("replay");
  const letters = document.getElementById("spaces");
  const guesses = document.getElementById("guesses");

  const randomWord = (function() {
    let words = ['apple', 'banana', 'orange', 'pear'];
  
    return function() {
      const max = words.length - 1;
      const min = 0;
  
      const index = Math.floor(Math.random() * (max - min + 1) + min);
      const randomWord = words[index];
      words.splice(index, 1);
  
      return randomWord;
    };
  })();

  class Game {
    constructor() {
      this.newGame();
    }
  
    newGame() {
      this.answer = randomWord();
  
      if (this.answer === undefined) {
        this.noMoreWords();
        return;
      };
  
      this.answer = this.answer.split('');
      this.incorrectGuesses = 0;
      this.lettersGuessed = [];
      this.incorrectGuessesAllowed = 6;
      this.createBlanks();
      message.textContent = '';
      this.hideReplayLink();
      
      let spans = guesses.querySelectorAll("span");
      spans.forEach(span => {
        span.parentNode.removeChild(span);
      });

      apples.className = '';
      document.body.className = '';
    }

    hideReplayLink() {
      replay.hidden = true;
    }

    showReplayLink() {
      replay.hidden = false;
    }
  
    gameOver(type) {
      switch (type) {
        case 'win':
          this.displayMessage("Congrats, you guessed it!");
          break;
        case 'lose':
          this.displayMessage("Sorry, you didn't guess it.");
          break;
      }

      document.body.className = type;
      this.showReplayLink();
    }
  
    createBlanks() {
      let spaces = (new Array(this.answer.length + 1)).join("<span></span>");
  
      let spans = letters.querySelectorAll("span");
      spans.forEach(span => {
        span.parentNode.removeChild(span);
      });
      letters.insertAdjacentHTML('beforeend', spaces);
      this.spaces = document.querySelectorAll('#spaces span');
    }

    displayMessage(text) {
      message.textContent = text;
    }

    guessLetter(letter) {
      if (this.lettersGuessed.includes(letter)) {
        return;
      } else if (this.answer.includes(letter)) {
        this.fillLetter(letter);
      } else {
        this.incorrectGuesses += 1;
        apples.className = `guess_${this.incorrectGuesses}`;
      }

      this.lettersGuessed.push(letter);
      this.displayNewGuess(letter);

      if (this.allLettersGuessed()) {
        this.gameOver('win');
      } else if (this.incorrectGuesses === this.incorrectGuessesAllowed) {
        this.gameOver('lose');
      }
    }

    fillLetter(letter) {
      let spans = letters.querySelectorAll("span");

      this.answer.forEach((currentLetter, index) => {
        if (currentLetter === letter.toLowerCase()) {
          spans[index].textContent = letter.toUpperCase();
        };
      });
    }

    displayNewGuess(letter) {
      let newSpan = document.createElement('span');
      newSpan.textContent = letter;
      guesses.appendChild(newSpan);
    }

    allLettersGuessed() {
      return this.answer.every(letter => this.lettersGuessed.includes(letter));
    }

    noMoreWords() {
      this.displayMessage('I am all out of words.');
      this.hideReplayLink();
    }
  };

  let game = new Game();

  document.addEventListener('keydown', (e) => {
    if (e.key.match(/^[a-zA-Z]$/)) {
      if (game.incorrectGuesses < game.incorrectGuessesAllowed) {
        game.guessLetter(e.key);
      }
    };
  });

  replay.addEventListener('click', (e) => {
    e.preventDefault();

    game.newGame();
  })
})