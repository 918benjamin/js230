/*
Implement a function that converts the DOM, starting from the body, to nested arrays.

> nodesToArr();
= ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]]

*/

function nodesToArr() {
  function walk(node) {
    let result;

    if (node.children.length > 0) {
      result = [node.nodeName, [].slice.call(node.children)];  
      
      for (let index = 0; index < node.children.length; index += 1) {
        result[1][index] = walk(node.children[index])
      }
    } else {
      result = [node.nodeName, []];
    }

    return result;
  }

  return walk(document.body);
}


// Check if the parent element has children.
// If the parent element has children set the value of the children array to it ([parentElement, [children]])
  // otherwise, set it to an empty array ([parentElement, []]).
// Check if any of the children are parents.
// If there are parents, repeat the process from step 1.


// function nodesToArr() {
//   let body = document.body;
//   let result;
//   walk(body, node => {
//     if (node.children.length > 0) {
      
//     }
//   })
//   return result;
// }

let a = nodesToArr();
console.log(JSON.stringify(a));

// example 1
//= ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]]

// example 2
// = ["BODY",[["HEADER",[]],["MAIN",[["DIV",[]],["DIV",[]]]],["FOOTER",[]]]]

// example 3
// = ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]]