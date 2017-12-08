// link to the full description: https://adventofcode.com/2017/day/7

import puzzleInput from '../data/day7';

/*

Make a tree; find the bottom node of the trww

*/

class Node {

  constructor({name, value}) {
    this.name = name;
    this.value = parseInt(value, 10);

    this.children = [];
  }

  setParent(node) {
    this.parent = node;
  }

  addChild(node) {
    node.setParent(this);
    this.children.push(node);
  }

  hasChildren() {
    return this.children.length > 0;
  }

}

function prepareInput(input) {
  return input.split('\n')
      .map(line => line.trim())
      .map(line => {
        return {
          name: line.match(/^(\w+) /)[1],
          value: line.match(/\((\d+)\)/)[1],
          children: line.match(/->/) ? line.match(/\s+(\w+)/g).map(name => name.trim()) : null
        }
      })
}

function createNode({name, value}) {
  let node = new Node({ name, value });
  return node;
}

export function buildTree(input) {
  let nodesData = prepareInput(input);
  let nodes = nodesData.map(node => createNode(node));
  nodes = nodes.map(node => {
      let nodeData = nodesData.find(({name}) => name === node.name);
      if (nodeData.children) {
        nodeData.children.forEach(childName => {
          let childNode = nodes.find(node => node.name === childName);
          node.addChild(childNode);
        })
      }
      return node;
    });
  return nodes;
}

export function findBottomNode(tree) {
  return tree.filter(node => {
    return !node.parent
  })[0];
}


console.log('Solution to the first part of the puzzle is:', findBottomNode(buildTree(puzzleInput)).name);

/* PART 2 */

// Find the node with a value that is different from values of its siblings

function partition(nodes) {
  // convention: left part has an odd node; right part has nodes with equal values
  let left = [];
  let right = [];
  let values = nodes.map(node => sumValues(node));

  values.forEach((currentValue, index) => {
    let timesOccurring = values.filter(value => value === currentValue).length;
    if (timesOccurring === 1) {
      left.push(nodes[index]);
    } else {
      right.push(nodes[index]);
    }
  })

  return [left, right];
}

function getUnbalancedChild(node) {
  let [left, right] = partition(node.children);
  return left[0] || null;
}

export function findUnbalancedNode(tree) {
  let bottomNode = findBottomNode(tree); // just imagine our tree, as opposed to CS trees, grows from bottom up; as normal trees do

  let currentNode = bottomNode;

  while(currentNode.hasChildren()) {
    let unbalancedNode = getUnbalancedChild(currentNode);
    if (unbalancedNode) {
      currentNode = unbalancedNode;
    } else {
      break;
    }
  }

  return currentNode;
}

function sumValues(node) {
  if (!node.hasChildren()) {
    return node.value;
  } else {
    return node.value + node.children.reduce((sum, child) => sum + sumValues(child), 0);
  }
}

function solvePart2() {
  let unbalancedNode = findUnbalancedNode(buildTree(puzzleInput));
  let parent = unbalancedNode.parent;
  let siblingNode = parent.children.filter(child => child !== unbalancedNode)[0];
  let unbalancedNodeSumOfValues = sumValues(unbalancedNode);
  let balancedNodeSumOfValues = sumValues(siblingNode);
  let balanceDifference = unbalancedNodeSumOfValues - balancedNodeSumOfValues;
  return unbalancedNode.value - balanceDifference;
}

console.log('Solution to the first part of the puzzle is:', solvePart2());
