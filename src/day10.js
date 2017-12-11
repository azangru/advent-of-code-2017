// full description: https://adventofcode.com/2017/day/10
import puzzleInput from '../data/day10';

import range from 'ramda/src/range';
import zip from 'ramda/src/zip';
import reverse from 'ramda/src/reverse';

/* PART 1 */
function generateList() {
  return range(0, 256);
}

export function reorderList(list, reorderLengths) {
  let cursorIndex = 0;

  for (let i = 0; i < reorderLengths.length; i++) {
    list = reorderSection(list, cursorIndex, reorderLengths[i]);
    cursorIndex = (cursorIndex + reorderLengths[i] + i) % list.length;
  }

  return list;
}

function reorderSection(list, currentIndex, number) {
  let indices = [];
  let values = [];

  for (let i = 0; i < number; i++) {
    let index = (currentIndex + i) % list.length;
    indices.push(index);
    values.push(list[index])
  }

  values = reverse(values);
  indices.forEach((index, position) => {
    list[index] = values[position];
  });
  return list;
}

export function validateReorderedList(list) {
  return list[0] * list[1];
}

function solvePart1() {
  let list = generateList();
  let reorderLengths = puzzleInput.split(',').map(Number);
  let reorderedList = reorderList(list, reorderLengths);
  return validateReorderedList(reorderedList);
}

console.log('solution of the first part of the puzzle is', solvePart1());
