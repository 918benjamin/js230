
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



// document.addEventListener('DOMContentLoaded', () => {
// })