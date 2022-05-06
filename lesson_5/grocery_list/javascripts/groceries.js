document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const item = document.getElementById('name').value;
    const quantity = parseInt(document.getElementById('quantity').value, 10) || 1;

    const groceryList = document.getElementById('grocery-list');

    const newItem = document.createElement('li');
    newItem.textContent = `${quantity} ${item}`;
    groceryList.appendChild(newItem);

    event.target.reset();
  })
});