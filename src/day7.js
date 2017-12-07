// link to the full description: https://adventofcode.com/2017/day/7

import puzzleInput from '../data/day7';

/*

Make a tree; find the bottom node of the trww

*/

class Node {

  constructor({name, value}) {
    this.name = name;
    this.value = value;

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
    // console.log('node', node, 'parent', node.parent);
    return !node.parent
  })[0];
}


// let input = `pbga (66)
// xhth (57)
// ebii (61)
// havc (66)
// ktlj (57)
// fwft (72) -> ktlj, cntj, xhth
// qoyq (66)
// padx (45) -> pbga, havc, qoyq
// tknk (41) -> ugml, padx, fwft
// jptl (61)
// ugml (68) -> gyxo, ebii, jptl
// gyxo (61)
// cntj (57)`;
//
// findBottomNode(buildTree(input));

console.log('Solution to the first part of the puzzle is:', findBottomNode(buildTree(puzzleInput)).name);

/* PART 2 */

// Find the node with a value that is different from values of its siblings

function partition(nodes) {
  // convention: left part has an odd node; right part has nodes with equal values
  let left = [];
  let right = [];
  let values = nodes.map(node => node.value);
  console.log('values', values);

  nodes.forEach(node => {
    let timesOccurring = values.filter(value => value === node.value).length;
    if (timesOccurring === 1) {
      left.push(node);
    } else {
      right.push(node);
    }
  });

  return [left, right];
}

export function findUnbalancedNode(tree) {
  let bottomNode = findBottomNode(tree); // just imagine our tree, as opposed to CS trees, grows from bottom up; as normal trees do

  let currentNode = bottomNode;

  while(currentNode.hasChildren()) {
    console.log('currentNode', currentNode);
    let [left, right] = partition(currentNode.children);
    currentNode = left[0];
  }

}
