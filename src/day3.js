// full description of the problems: https://adventofcode.com/2017/day/3

import until from 'ramda/src/until';
import clone from 'ramda/src/clone';
import curry from 'ramda/src/curry';
import merge from 'ramda/src/merge';
import path from 'ramda/src/path';

import puzzleInput from '../data/day3';

/* PART 1 */

/**
* Should calculate the Manhattan distance between an arbitraty number in a spiral matrix
* and the center of the matrix

Sample matrix:

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...

*/


// accepts a number; builds a 2-d array with empty slots to be filled in by further functions
// NOTE: this is not a very clever way of building the grid, as will be obvious from the second
// part of the puzzle, where the numbers are incremented much faster than by one per step
function buildGrid(number) {
  // calculate the length of the side of the grid
  let sideLength = Math.ceil(Math.sqrt(number));
  //  (make sure it's an odd number, because the grid has a center)
  sideLength = sideLength % 2 === 0 ? sideLength + 1 : sideLength;

  const makeColumns = () => new Array(sideLength).fill(null);
  const grid = new Array(sideLength)
    .fill(null)
    .map(makeColumns);
  return grid;
}

export function incrementNextNumberByOne({ currentNumber }) {
  return currentNumber + 1;
}

// produce a sequence of turns in counter-clockwise direction
function* directionsGenerator() {
  const directions = ['RIGHT', 'UP', 'LEFT', 'DOWN'];
  let index = 0;

  while (true) {
    yield directions[index];
    index = (index + 1) % directions.length;
  }
}

function fillCell(data) {
  let {
    currentNumber,
    matrix,
    currentPosition,
    steps,
    currentStep,
    direction,
    getDirections,
    turns,
    nextNumberCalculator
  } = data;
  let nextPosition;
  let nextStep;

  if (direction === 'RIGHT') {
    nextPosition = { x: currentPosition.x + 1, y: currentPosition.y  }
  } else if (direction === 'UP') {
    nextPosition = { x: currentPosition.x, y: currentPosition.y - 1  }
  } else if (direction === 'LEFT') {
    nextPosition = { x: currentPosition.x - 1, y: currentPosition.y  }
  } else if (direction === 'DOWN') {
    nextPosition = { x: currentPosition.x, y: currentPosition.y + 1  }
  }

  let nextNumber = nextNumberCalculator(merge(data, {currentPosition: nextPosition}));
  matrix[nextPosition.y][nextPosition.x] = nextNumber;

  if (currentStep + 1 < steps) {
    nextStep = currentStep + 1;
  } else {
    nextStep = 0;
    direction = getDirections.next().value;
    turns = turns - 1;
    if (turns === 0) {
      steps = steps + 1;
      turns = 2;
    }
  }

  return merge(data, {
    currentNumber: nextNumber,
    matrix,
    currentPosition: nextPosition,
    currentStep: nextStep,
    steps,
    turns,
    direction
  });
}

function isNumberReached() {
  return curry((number, { currentNumber, matrix }) => {
    return number === currentNumber;
  })
}

/**
* Briefly, the algorithm for filling the matrix in a spiral pattern is as follows:
  - start from the center;
  - start with the side of the spiral that is equal to 1 cell;
  - when a side is filled with numbers, turn in the direction returned by directions generator;
  - fill the next side with the same number of cells;
  - turn again;
  - after every 2 turns, increase the length of the side of the spiral by 1 cell
*/
export function fillMatrix(number, nextNumberCalculator, untilPredicate = isNumberReached) {
  const getDirections = directionsGenerator();
  let matrix = buildGrid(number);
  let matrixSideLength = matrix[0].length;
  let center = { x: Math.floor(matrixSideLength/2), y: Math.floor(matrixSideLength/2) };
  let startingNumber = 1;
  matrix[center.y][center.x] = startingNumber;

  let initialData = {
    currentNumber: startingNumber,
    targetNumber: number,
    matrix,
    center,
    currentPosition: center,
    steps: 1,
    currentStep: 0,
    getDirections,
    direction: getDirections.next().value,
    turns: 2,
    nextNumberCalculator
  }

  let isTargetNumberReached = untilPredicate()(number);

  return until(isTargetNumberReached, fillCell)(initialData);
}

export function findManhattanDistanceFromCenter(number) {
  let { currentPosition, center } = fillMatrix(number, incrementNextNumberByOne);
  return Math.abs((currentPosition.x - center.x)) + Math.abs((currentPosition.y - center.y));
}

console.log('Solution to the first part of the puzzle is', findManhattanDistanceFromCenter(puzzleInput));


/* PART 2 */

/**
* Draw the matrix in the same counterclockwise spiral pattern, but this time
* every next number should be the sum of adjacent numbers in the matrix
* (i.e. of numbers that are in the cells that are horizontally, vertically,
* or diagonally in contact with the cell where the next number will be placed )

Sample matrix:

147  142  133  122   59
304    5    4    2   57
330   10    1    1   54
351   11   23   25   26
362  747  806--->   ...

*/

export function getSumOfAdjacentNumbers({ currentPosition, matrix }) {
  // using Ramda's `path` to safely access nested arrays
  let adjacentNumbers = [
    path([`${currentPosition.y-1}`, `${currentPosition.x-1}`], matrix),
    path([`${currentPosition.y-1}`, `${currentPosition.x}`], matrix),
    path([`${currentPosition.y-1}`, `${currentPosition.x+1}`], matrix),
    path([`${currentPosition.y}`, `${currentPosition.x-1}`], matrix),
    path([`${currentPosition.y}`, `${currentPosition.x+1}`], matrix),
    path([`${currentPosition.y+1}`, `${currentPosition.x-1}`], matrix),
    path([`${currentPosition.y+1}`, `${currentPosition.x}`], matrix),
    path([`${currentPosition.y+1}`, `${currentPosition.x+1}`], matrix)
  ].filter(value => typeof value === 'number');

  return adjacentNumbers.reduce((sum, number) => sum + number, 0);
}

export function findNextNumberGreaterThanPuzzleInput(input) {
  let { currentNumber } = fillMatrix(input, getSumOfAdjacentNumbers, isGreaterNumberReached);
  return currentNumber;
}

export function isGreaterNumberReached() {
  return curry((number, { currentNumber }) => {
    return currentNumber > number;
  })
}

console.log('Solution to the second part of the puzzle is', findNextNumberGreaterThanPuzzleInput(puzzleInput))
