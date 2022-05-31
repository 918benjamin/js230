//// V1
// let CLASSIFICATIONS = {
//   Vertebrate: ["Bear", "Turtle", "Whale", "Salmon", "Ostrich"],
//   "Warm-blooded": ["Bear", "Whale", "Ostrich"],
//   "Cold-blooded": ["Salmon", "Turtle"],
//   Mammal: ["Bear", "Whale"],
//   Bird:	['Ostrich'],
// }

// let ANIMALS = {
//   Bear: ["Vertebrate", "Warm-blooded", "Mammal"],
//   Turtle: ["Vertebrate", "Cold-blooded"],
//   Whale: ["Vertebrate", "Warm-blooded", "Mammal"],
//   Salmon: ["Vertebrate", "Cold-blooded"],
//   Ostrich: ["Vertebrate", "Warm-blooded", "Bird"],
// }

// function clearLists(nodeList) {
//   for (let i = 1; i < nodeList.length; i += 1) {
//     nodeList[i].hidden = false;
//   }
// }

// function hideAnimals(selectedClassification, animalList) {
//   let approvedAnimals = CLASSIFICATIONS[selectedClassification];
//   console.log(approvedAnimals);
//   let selected = false;
//   for (let i = 0; i < animalList.length; i += 1) {
//     if (!approvedAnimals.includes(animalList[i].value)) {
//       animalList[i].hidden = true;
//     } else if (!selected) {
//       animalList[i].selected = true;
//       selected = true;
//     }
//   }
// }

// function hideClassifications(selectedAnimal, classificationList) {
//   let approvedClassifications = ANIMALS[selectedAnimal];
//   console.log(approvedClassifications);
//   let selected = false;
//   for (let i = 0; i < classificationList.length; i += 1) {
//     if (!approvedClassifications.includes(classificationList[i].value)) {
//       classificationList[i].hidden = true;
//     } else if (!selected) {
//       classificationList[i].selected = true;
//       selected = true;
//     }
//   }
// }

// document.addEventListener('DOMContentLoaded', () => {
//   let animals = document.getElementById('animals');
//   let classifications = document.getElementById('animal-classifications');
//   let clear = document.getElementById('clear');

//   let animalsClone = animals.cloneNode(true);
//   let classificationsClone = classifications.cloneNode(true);
  
//   animals.addEventListener('change', event => {
//     let selectedAnimal = event.target.value;
//     hideClassifications(selectedAnimal, classifications.children);
//   })

//   classifications.addEventListener('change', event => {
//     let selectedClassification = event.target.value;
//     hideAnimals(selectedClassification, animals.children);
//   })

//   clear.addEventListener('click', event => {
//     event.preventDefault();
//     clearLists(animals.children);
//     clearLists(classifications.children);
//     document.querySelector('form').reset();
//   })
// })


let data = {
  Classifications: {
    Vertebrate:	["Bear", "Turtle", "Whale", "Salmon", "Ostrich"],
    "Warm-blooded":	["Bear", "Whale", "Ostrich"],
    "Cold-blooded":	["Salmon", "Turtle"],
    Mammal:	["Bear", "Whale"],
    Bird:	["Ostrich"],
  },
  
  Animals: {
    Bear: ["Vertebrate", "Warm-blooded", "Mammal"],
    Turtle:  ["Vertebrate", "Cold-blooded"],
    Whale:  ["Vertebrate", "Warm-blooded", "Mammal"],
    Salmon:  ["Vertebrate", "Cold-blooded"],
    Ostrich:  ["Vertebrate", "Warm-blooded", "Bird"],
  }
}

//// Pattern: Cache the original state ////
function displayOptions(e, selectType, menu, cache) {
  let selection = e.target.value;

  menu.options.length = 0;
  
  cache.filter(option => data[selectType][selection].includes(option.value))
       .forEach(option => {
          menu.appendChild(option);
          option.selected = false;
       });
  
  
  menu.children[0].selected = true;
}

function clear(menu, cache) {
  menu.options.length = 0;
  
  cache.forEach(option => {
    menu.appendChild(option);
  });
 
  menu.children[0].selected = true;
}

let classificationMenu = document.querySelector('#animal-classifications');
let classificationCache = Array.from(classificationMenu.cloneNode(true).children);
let animalMenu = document.querySelector('#animals');
let animalCache = Array.from(animalMenu.cloneNode(true).children);
let clearButton = document.querySelector('#clear');

classificationMenu.addEventListener('change', e => {
  displayOptions(e, 'Classifications', animalMenu, animalCache)
});

animalMenu.addEventListener('change', e => {
  displayOptions(e, 'Animals', classificationMenu, classificationCache)
});

clearButton.addEventListener('click', e => {
  e.preventDefault();
  clear(classificationMenu, classificationCache);
  clear(animalMenu, animalCache);
});


//// Pattern: Hiding each option, clearing shows them all ////
// function displayOptions(e, selectType, menu) {
//   let selection = e.target.value;
//   let options = Array.from(menu.children);
//   let selectedAlready = false;
//   options.forEach(option => {
//     if (data[selectType][selection].includes(option.value)) {
//       option.hidden = false;
//       if (!selectedAlready) {
//         option.selected = true;
//         selectedAlready = true;
//       }
//     } else {
//       option.hidden = true;
//     }
//   });
// }

// function clear(menu) {
//   let options = Array.from(menu.children);
//   options.forEach(option => {
//     option.hidden = false;
//     option.selected = false;
//   });
//   options[0].selected = true;
// }

// let classificationMenu = document.querySelector('#animal-classifications');
// let animalMenu = document.querySelector('#animals');
// let clearButton = document.querySelector('#clear');

// classificationMenu.addEventListener('change', e => {
//   displayOptions(e, 'Classifications', animalMenu)
// });

// animalMenu.addEventListener('change', e => {
//   displayOptions(e, 'Animals', classificationMenu)
// });

// clearButton.addEventListener('click', e => {
//   e.preventDefault();
//   clear(classificationMenu);
//   clear(animalMenu);
// });