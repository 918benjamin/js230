/*
Write a function that colors a set of elements that are on the same level of indentation.

- iterate through all the child nodes of body
- if the current child node is at the level, add a class of generation-color to the current element
*/
"use strict";

function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.children.length; index += 1) {
    walk(node.children[index], callback);
  }
}

function colorElement(element) {
  let elementLevel = 0;
  let current = element;

  while(current != body) {
    elementLevel += 1;
    current = current.parentElement;
  }

  if (elementLevel === level) {
    element.setAttribute('class', 'generation-color');
  }
}

function colorGeneration(level) {
  let body = document.body;
  if (level === 0) {
    return;
  }
  
  walk(body, element => {
    let elementLevel = 0;
    let current = element;
  
    while(current != body) {
      elementLevel += 1;
      current = current.parentElement;
    }
  
    if (elementLevel === level) {
      element.classList.add('generation-color');
    }
  })
}

// colorGeneration(1);
// colorGeneration(4);
// colorGeneration(7);
// colorGeneration(8);
// colorGeneration(3);
colorGeneration(0);
