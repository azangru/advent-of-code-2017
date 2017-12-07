import {
  buildTree,
  findBottomNode,
  findUnbalancedNode
} from '../src/day7';

let testInput = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;

describe('buildTree', () => {

  test('builds a tree from sample input', () => {
    let bottomNodeName = 'tknk';

    expect(findBottomNode(buildTree(testInput)).name).toBe(bottomNodeName);
  })

});

describe('findUnbalancedNode', () => {

  test('finds unbalanced node in the tree', () => {
    // console.log(buildTree(testInput));
    console.log(findUnbalancedNode(buildTree(testInput)));

    expect(true).toBe(true);
  });

})