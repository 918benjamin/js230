const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

function createOptions() {
  function addIfNew(key, value) {
    if (!result[key].includes(value)) { result[key].push(value) }
  }

  const result = {
    make: [],
    model: [],
    year: [],
    price: [],
  };

  cars.forEach(car => {
    addIfNew('make', car.make);
    addIfNew('model', car.model);
    addIfNew('year', car.year);
    addIfNew('price', car.price);
  })

  Object.keys(result).forEach(key => {
    let select = document.querySelector(`#${key}`);
    result[key].forEach(value => {
      select.insertAdjacentHTML('beforeend', `<option>${value}</option>`)
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const templates = {};

  document.querySelectorAll('[type="text/x-handlebars"]').forEach(template => {
    templates[template.id] = Handlebars.compile(template.innerHTML);
  });

  document.querySelectorAll('[data-type="partial"]').forEach(partial => {
    Handlebars.registerPartial(partial.id, partial.innerHTML);
  });

  const main = document.querySelector('main');

  main.innerHTML = templates.cars({cars: cars});

  createOptions();

  // const form = document.querySelector
})