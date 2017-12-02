import puzzleInput from '../data/day1';

/* PART 1 */

// Return *sum* of all digits that match the *next^ digit in the list
// NOTE: The list is circular, so the digit after the last digit is the *first* digit in the list.

// NOTE: solution for the first part was extremely naive

function solver1(string) {
  return string
    .split('')
    .filter((number, index) => {
      if (index === string.length - 1) {
        return compareNumbers(number, string[0]);
      } else {
        return compareNumbers(number, string[index + 1]);
      }
    })
    .reduce((accumulator, number) => accumulator + parseInt(number, 10), 0)
}

function compareNumbers(num1, num2) {
  return parseInt(num1, 10) === parseInt(num2, 10);
}

console.log('Solution to the first part of the puzzle:', solver1(puzzleInput));

/* PART 2 */

// Now, instead of comparing a digit with the next digit, we need to compare it
// with the digit half way across the list (i.e. at list.length/2 elements away)

// NOTE: this is a more generalized solution

export function solver2(string) {
  const list = string.split('').map((number) => parseInt(number, 10));

  return list
    .filter((number, index) => number === list[findIndex(index, list)])
    .reduce((accumulator, number) => accumulator + number, 0)
}

function findIndex(currentIndex, list) {
  return (currentIndex + list.length / 2) % list.length;
}

console.log('Solution to the second part of the puzzle:', solver2(puzzleInput));
