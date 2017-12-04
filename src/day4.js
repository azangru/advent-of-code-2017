// full description: https://adventofcode.com/2017/day/4

import puzzleInput from '../data/day4';
import uniq from 'ramda/src/uniq';
import compose from 'ramda/src/compose';
import map from 'ramda/src/map';
import length from 'ramda/src/length';

/* PART 1 */

// filter the array of strings from strings containing non-unique words

function prepareInput(multilineString) {
  let lines = multilineString.split('\n');
  let regex = /(\w+)/g;

  return lines.map(line => line.match(regex));
}

export function hasNoDuplicates(array) {
  return uniq(array).length === array.length;
}

function countLinesWithNoDuplicates(lines) {
  return lines.filter(hasNoDuplicates)
    .reduce((accumulator, line) => accumulator + 1, 0);
}

function countValidPassphrases(input, validityChecker) {
  return validityChecker(prepareInput(input));
}

console.log('Solution to Part 1 of the puzzle is', countValidPassphrases(puzzleInput, countLinesWithNoDuplicates));

/* PART 2 */

// filter the array of strings excluding strings that contain anagrams

function makeLetterMap(string) {
  return string.split('')
    .reduce((accumulator, letter) => {
      accumulator[letter] = accumulator[letter] ? accumulator[letter] + 1 : 1;
      return accumulator;
    }, {});
}

let calculateLengthOfArrayWithoutAnagrams = compose(
  length,
  uniq,
  map(makeLetterMap)
);

export function hasNoAnagrams(array) {
  return calculateLengthOfArrayWithoutAnagrams(array) === array.length;
}

function countLinesWithNoAnagrams(lines) {
  return lines.filter(hasNoAnagrams)
    .reduce((accumulator, line) => accumulator + 1, 0);
}

console.log('Solution to Part 2 of the puzzle is', countValidPassphrases(puzzleInput, countLinesWithNoAnagrams));
