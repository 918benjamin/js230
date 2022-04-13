function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}

function clearClassFromAllNodes(className) {
  walk(document.body, node => {
    if (node.nodeType === 1 && node.classList.contains(className)) {
      node.classList.remove(className);
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', event => {
    event.stopPropagation();
    let target = event.target;

    clearClassFromAllNodes('highlight');
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