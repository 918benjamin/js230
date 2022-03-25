/*
inputs:
  - start index (parent node's id)
  - end index (child node's id)
- output: array of tagNames
- inclusive of start and end
- end index doesn't have to be the innermost child node
- only consider element nodes
- only elements that have body as an ancestor are sliceable
- if id of start or end is not in the dom, return undefined
- if slice not feasible, return undefined
  - no path connecting element at starting index to ending index

Algorithm:
- create an empty result array
- get the element at the start and ending indices
- initialize a currentElement variable to innermost child element
- if either element is null
  return undefined
- otherwise, loop while the currentElement has an id that isn't an empty string
  - put the currentElement's tagName in the result array
  - set the currentElement to the current element's parent element
  - if the parent element has no id (empty string) AND the current element id is not starting id
    return undefined
- reverse the result array
- return the result array
*/

function sliceTree(startID, stopID) {
  let result = [];
  let parent = document.getElementById(startID);
  let child = document.getElementById(stopID);
  if (parent === null || child === null) {
    return undefined;
  }
  let currentElement = child;
  while (currentElement.id !== '') {
    result.unshift(currentElement);
    if (currentElement.id === String(startID)) {
      break;
    }
    currentElement = currentElement.parentElement;
  }
  if (result[0].id !== String(startID)) {
    return undefined;
  }

  return result.map(element => element.tagName);
}

console.log(sliceTree(1, 4));
// = ["ARTICLE", "HEADER", "SPAN", "A"]
console.log(sliceTree(1, 76));
// = undefined
console.log(sliceTree(2, 5));
// = undefined
console.log(sliceTree(5, 4));
// = undefined
console.log(sliceTree(1, 23));
// = ["ARTICLE", "FOOTER"]
console.log(sliceTree(1, 22));
// = ["ARTICLE", "MAIN", "SECTION", "P", "SPAN", "STRONG", "A"]
console.log(sliceTree(11, 19));
// = ["SECTION", "P", "SPAN", "STRONG", "A"]