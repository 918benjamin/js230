function arrayToNodes(nodes) {
  let element = document.createElement(nodes[0]);
  let children = nodes[1];

  if (children.length !== 0) {
    for (let index = 0; index < children.length; index += 1) {
      let child = children[index];
      element.appendChild(arrayToNodes(child));
    }
  }

  return element;
}

// const nodes = ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]];
const nodes = ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]];
let a = arrayToNodes(nodes);
