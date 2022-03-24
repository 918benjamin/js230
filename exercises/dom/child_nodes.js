function childNodes(id) {
  let node = document.getElementById(String(id));
  let total = 0;
  function walk(node, callback) {
    callback(node);
  
    for (let index = 0; index < node.childNodes.length; index += 1) {
      walk(node.childNodes[index], callback);
    }
  }

  walk(node, child => { total += child.childNodes.length })
  let direct = node.childNodes.length;
  let indirect = total - direct;
  return [direct, indirect];
}

// sample output
let a = childNodes(1);
// = [9, 12]
let b = childNodes(4);
// = [3, 1]
let c = childNodes(9);
// = [1, 1]

console.log(a, b, c);