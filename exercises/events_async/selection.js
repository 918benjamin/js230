let CLASSIFICATIONS = {
  Vertebrate: ["Bear", "Turtle", "Whale", "Salmon", "Ostrich"],
  "Warm-blooded": ["Bear", "Whale", "Ostrich"],
  "Cold-blooded": ["Salmon", "Turtle"],
  Mammal: ["Bear", "Whale"],
  Bird:	['Ostrich'],
}

let ANIMALS = {
  Bear: ["Vertebrate", "Warm-blooded", "Mammal"],
  Turtle: ["Vertebrate", "Cold-blooded"],
  Whale: ["Vertebrate", "Warm-blooded", "Mammal"],
  Salmon: ["Vertebrate", "Cold-blooded"],
  Ostrich: ["Vertebrate", "Warm-blooded", "Bird"],
}

function clearLists(nodeList) {
  for (let i = 1; i < nodeList.length; i += 1) {
    nodeList[i].hidden = false;
  }
}

function hideAnimals(selectedClassification, animalList) {
  let approvedAnimals = CLASSIFICATIONS[selectedClassification];
  console.log(approvedAnimals);
  let selected = false;
  for (let i = 0; i < animalList.length; i += 1) {
    if (!approvedAnimals.includes(animalList[i].value)) {
      animalList[i].hidden = true;
    } else if (!selected) {
      animalList[i].selected = true;
      selected = true;
    }
  }
}

function hideClassifications(selectedAnimal, classificationList) {
  let approvedClassifications = ANIMALS[selectedAnimal];
  console.log(approvedClassifications);
  let selected = false;
  for (let i = 0; i < classificationList.length; i += 1) {
    if (!approvedClassifications.includes(classificationList[i].value)) {
      classificationList[i].hidden = true;
    } else if (!selected) {
      classificationList[i].selected = true;
      selected = true;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let animals = document.getElementById('animals');
  let classifications = document.getElementById('animal-classifications');
  let clear = document.getElementById('clear');

  let animalsClone = animals.cloneNode(true);
  let classificationsClone = classifications.cloneNode(true);
  
  animals.addEventListener('change', event => {
    let selectedAnimal = event.target.value;
    hideClassifications(selectedAnimal, classifications.children);
  })

  classifications.addEventListener('change', event => {
    let selectedClassification = event.target.value;
    hideAnimals(selectedClassification, animals.children);
  })

  clear.addEventListener('click', event => {
    event.preventDefault();
    clearLists(animals.children);
    clearLists(classifications.children);
    document.querySelector('form').reset();
  })
})