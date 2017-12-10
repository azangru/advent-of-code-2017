// full description: https://adventofcode.com/2017/day/9

import puzzleInput from '../data/day9.js';

/* PART 1 */

function removeEscapes(string) {
  return string.replace(/!.{1}/g, '');
}

function removeGarbage(string) {
  return string;
  // return string.replace(/\<.*?\>,?/g, '');
}

function cleanInput(input) {
  input = removeEscapes(input);
  input = removeGarbage(input);
  return input;
}

export function countScore(input) {
  input = cleanInput(input);
  let currentScore = 0;
  let currentDepth = 1;
  let inGarbage = false;
  let garbageCharactersCount = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '{' && !inGarbage) {
      currentScore = currentScore + currentDepth;
      currentDepth++;
    } else if (input[i] === '}' && !inGarbage) {
      currentDepth--;
    } else if (input[i] === '<' && !inGarbage) {
      inGarbage = true;
    } else if (input[i] === '>') {
      inGarbage = false;
    } else if (inGarbage) {
      garbageCharactersCount++;
    }
  }
  return { currentScore, garbageCharactersCount };
}

console.log('solution to the first part of the puzzle is', countScore(puzzleInput).currentScore);
console.log('solution to the second part of the puzzle is', countScore(puzzleInput).garbageCharactersCount);
