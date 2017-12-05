// link to full text of the puzzle: https://adventofcode.com/2017/day/5

import puzzleInput from '../data/day5';
import until from 'ramda/src/until';
import merge from 'ramda/src/merge';


/* PART 1 */

/*

Walk through an array of numbers.
Every positive number moves the cursor by this many elements to the right (toward the tail of the array)
Every negative number moves the cursor by this many elements to the left (toward the head of the array)

Every time the cursor visits a number, it increases its value by 1
*/

// the input is a list of lines, each consisting of a single number
function prepareInput(input) {
  const regex = /-?(\d+)/gm;
  return input.match(regex)
    .map(element => parseInt(element, 10));
}

export function findNumberOfStepsToExecuteInstructions(input, atIndexModifier) {
  const array = prepareInput(input);
  const initialData = {
    array,
    step: 0,
    currentPosition: 0,
    atIndexModifier
  };

  // console.log(isOutsideOfArray(walkArray(initialData)));
  let walkedArray = walkArray(initialData);

  while (!isOutsideOfArray(walkedArray)) {
    walkedArray = walkArray(walkedArray);
  }

  return walkedArray.step;
}

function isOutsideOfArray(data) {
  const { array, currentPosition } = data;
  return currentPosition >= array.length;
}

function walkArray(data) {
  const { array, step, currentPosition, atIndexModifier } = data;
  const distance = array[currentPosition];
  array[currentPosition] = atIndexModifier(array[currentPosition]);

  return {
      array,
      step: step + 1,
      currentPosition: currentPosition + distance,
      atIndexModifier
    };
}

export function plusOne(number) {
  return number + 1;
}

export function changeBasedOnValue(number) {
  return number >= 3 ? number - 1 : number + 1;
}

// console.log('solution to the first part of the puzzle:', findNumberOfStepsToExecuteInstructions(puzzleInput, plusOne));

/* PART 2 */

// Getting into performance problems with my implementation. Will try to be imperative as fuck:

export function calculateSolution2(input) {
  let array = prepareInput(input);
  let position = 0;
  let step = 0;
  let distance;

  while(position < array.length) {
    let distance = array[position];
    if (distance >= 3) {
      array[position] = array[position] - 1;
    } else {
      array[position] = array[position] + 1;
    }
    position = position + distance;
    step++;
  }

  return step;
}


console.log('solution to the second part of the puzzle:', calculateSolution2(puzzleInput))
