// full description of the problem: https://adventofcode.com/2017/day/6

import puzzleInput from '../data/day6';
import equals from 'ramda/src/equals';
import any from 'ramda/src/any';

/* PART 1 */

/*

Shuffle the numbers along the array until the initial configuration is reached:

- find largest number in the array
- remember this number and replace it with 0
- walk along the array (cyclically), adding 1 to each consecutive number for as many
times as is the remembered number
- repeat
- stop when the initial configuration is reached

*/


function prepareInput(input) {
  return input.match(/(\d+)/g).map(Number);
}

function shuffle(numbers) {
  let largestNumber = Math.max.apply(null, numbers);
  let indexOfLargestNumber = numbers.indexOf(largestNumber);
  numbers[indexOfLargestNumber] = 0;

  for (let i = 0; i < largestNumber; i++) {
    let currentIndex = (indexOfLargestNumber + 1 + i) % numbers.length;
    numbers[currentIndex] = numbers[currentIndex] + 1;
  }

  return numbers;
}

export function calculateNumberOfShuffles(numbers) {
  let configurations = new Map();
  rememberConfiguration(numbers, configurations, 0);

  let shuffledNumbers = shuffle(numbers);
  let numberOfShuffles = 1;
  let shouldContinue = true;

  while(!alreadyOccurred(shuffledNumbers, configurations)) {
    configurations = rememberConfiguration(shuffledNumbers, configurations, numberOfShuffles);
    shuffledNumbers = shuffle(shuffledNumbers);
    numberOfShuffles++;
  }

  let loopSize = numberOfShuffles - alreadyOccurred(shuffledNumbers, configurations);

  return { numberOfShuffles, loopSize };
}

function rememberConfiguration(configuration, configurations, numberOfShuffles) {
  configurations.set(configuration.toString(), numberOfShuffles);
  return configurations;
}

function alreadyOccurred(configuration, configurations) {
  let key = configuration.toString();
  // console.log('configurations', configurations);
  return configurations.get(key) || false;
}


console.log('solution to the first part of the puzzle is:', calculateNumberOfShuffles(prepareInput(puzzleInput)).numberOfShuffles);

/* PART 2 */

// find the loop size (the distance from the last encountered number configuration)
console.log('solution to the second part of the puzzle is:', calculateNumberOfShuffles(prepareInput(puzzleInput)).loopSize);
