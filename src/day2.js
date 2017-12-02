// full description of the problems: https://adventofcode.com/2017/day/2

import puzzleInput from '../data/day2';

/* PART 1 */

/**
* Calculate the sum of the differences between the largest and the smallest value of each row
* and then add up these sums to get the final answer
*/

// transform a multi-line string of tab-separated numbers into a two-dimensional array
function prepareInput(string) {
  let rows = string.split('\n');
  let numberExtractionRegex = /\d+/g;
  return rows.map(row =>
    row.match(numberExtractionRegex)
      .map(character => parseInt(character, 10)));
}

function findDifferenceBetweenLargestAndSmallest(numbers) {
  const largest = Math.max.apply(null, numbers);
  const smallest = Math.min.apply(null, numbers);
  return largest - smallest;
}

function checksum1(table) {
  return prepareInput(table) // string -> 2d array of numbers
    .reduce((accumulator, row) => accumulator + findDifferenceBetweenLargestAndSmallest(row), 0);
}

/* PART 2 */

/**
* Given the same input as in part 1,
* find in each row two numbers that evenly divide one another (there should only be two per row)
* then add up the results of those divisions
*/

function findResultOfDivision(numbers) {
  let result = 0;
  numbers.forEach(divisor => {
    numbers.forEach(number => {
      if (number !== divisor && number % divisor === 0) {
        result = number / divisor;
      }
    });
  })
  return result;
}

function checksum2(table) {
  return prepareInput(table) // string -> 2d array of numbers
    .reduce((accumulator, row) => accumulator + findResultOfDivision(row), 0);
}

console.log('Solution for first part of day2 puzzle is:', checksum1(puzzleInput));
console.log('Solution for second part of day2 puzzle is:', checksum2(puzzleInput));

export { checksum1, checksum2 };
