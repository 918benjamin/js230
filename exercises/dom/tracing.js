console.log('test');

function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}

function domTreeTracer(id) {
  let node = document.getElementById(id);
  let result = [];

  do {
    let siblings = Array.prototype.slice.call(node.parentNode.children);
    let actualSiblings = siblings.filter(sibling => sibling.nodeName !== 'SCRIPT');
    result.push(actualSiblings.map(sibling => sibling.nodeName));
    node = node.parentNode;
  } while (node.id !== '');

  // return node;
  return result;
}

let a = domTreeTracer(1);
// = [["ARTICLE"]]
let b = domTreeTracer(2);
// = [["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
let c = domTreeTracer(22);
// = [["A"], ["STRONG"], ["SPAN", "SPAN"], ["P", "P"], ["SECTION", "SECTION"], ["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]

console.log(a);
console.log(b);
console.log(c);