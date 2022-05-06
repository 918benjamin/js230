$(function() {
  $('form').on('submit', (event) => {
    event.preventDefault();

    const val1 = parseInt($('#first-number').val(), 10);
    const val2 = parseInt($('#second-number').val(), 10);
    const operator = $('#operator option:selected').text();

    let result;

    switch (operator) {
      case '+':
        result = val1 + val2;
        break;
      case '-':
        result = val1 - val2;
        break;
      case '*':
        result = val1 * val2;
        break;
      case '/':
        result = val1 / val2;
        break;
      default:
        alert('error!');
    }

    $('#result').text(result);
  });
});