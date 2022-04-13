function removeHighlight() {
  const highlighted = document.querySelector('.highlight');
  if (highlighted) {
    highlighted.classList.remove('highlight');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', event => {
    event.stopPropagation();
    let target = event.target;

    removeHighlight();
    if (target.tagName === 'A') {
      document.querySelector(target.hash).classList.add('highlight');
    } else if (target.closest('article')) {
      let article = target.closest('article')
      article.classList.add('highlight');
    } else {
      document.querySelector('main').classList.add('highlight');
    }
  });
  
  document.querySelector('article').addEventListener('click', event => {
    let target = event.target;

  })
})