function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(...callbacks) {
  let start = 1;

  let counterID = setInterval(() => {
    console.log(start);
    start += 1;
  }, 1000);


  callbacks.forEach(callback => {
    let random = getRandomIntInclusive(1, 2 * callbacks.length);
    setTimeout(callback, random * 1000);
  });

  setTimeout(() => {
    clearInterval(counterID);
  }, callbacks.length * 2 * 1000)
}

randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6