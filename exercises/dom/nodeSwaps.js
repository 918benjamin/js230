/*
Swap the nodes at two id values
- return undefined if:
  - either or both ids are invalid
  - either is the child of the other
- otherwise, swap and return true
  - save the location of the second node
    - save the parent node
    - save the location within children
      - go to parent node
      - get children
      - iterate until you find the current node
      - if we're at the end, 
  - replace the first node with the second node
  - add the first node in the second node's place
*/

function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}

function notChildOf(node1, node2) {
  let result = true;
  walk(node1, node => {
    if (node === node2) {
      result = false;
    }
  });

  walk(node2, node => {
    if (node === node1) {
      result = false;
    }
  });

  return result;
}

function nodeSwap(id1, id2) {
  let node1 = document.getElementById(id1);
  let node2 = document.getElementById(id2);

  if(node1 && node2 && notChildOf(node1, node2)) {
    let node2NextSibling = node2.nextElementSibling;
    node1.parentNode.replaceChild(node2, node1);
    if (node2NextSibling) {
      node2NextSibling.insertAdjacentElement("beforebegin", node1);  
    } else {
      node2.parentElement.insertAdjacentElement("beforeend", node1);
    }
    
    return true;
  }
}

// // Invalid Swaps
// // at least one of the id attributes doesn't exist
// console.log(nodeSwap(1, 20));
// // = undefined

// // at least one of the nodes is a "child" of the other
// console.log(nodeSwap(1, 4));
// // = undefined
// console.log(nodeSwap(9, 3));
// // = undefined

// // Valid Swaps
// // one swap
// console.log(nodeSwap(1, 2));


// // multiple swaps
console.log(nodeSwap(3, 1));
console.log(nodeSwap(7, 9));