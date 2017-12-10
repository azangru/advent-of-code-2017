// full description: https://adventofcode.com/2017/day/8

import puzzleInput from '../data/day8';
import add from 'ramda/src/add';
import subtract from 'ramda/src/subtract';
import compose from 'ramda/src/compose';
import not from 'ramda/src/not';
import equals from 'ramda/src/equals';
import gt from 'ramda/src/gt';
import gte from 'ramda/src/gte';
import lt from 'ramda/src/lt';
import lte from 'ramda/src/lte';


/* PART 1 */

// parse instructions from strings; perform them

/*
After splitting at white spaces, each instruction consists of 7 elements:

Example:
c inc -20 if c == 10

is:

["c", "inc", "-20", "if", "c", "==", "10"]

*/

function parseInput(input) {
  return input.split('\n');
}

function extractRegisters(lines) {
  return lines
    .map(line => line.split(' '))
    .reduce((accumulator, line) => {
      let register = line[0];
      accumulator[register] = 0; // initial value
      return accumulator;
    }, {});
}

function performInstruction(instruction, registers) {
  let splitInstruction = instruction.split(' ');
  let register = splitInstruction[0];
  let operation = splitInstruction[1] === 'inc' ? add : subtract;
  let value = parseInt(splitInstruction[2], 10);
  let comparedRegister = splitInstruction[4];
  let comparisonSymbol = splitInstruction[5];
  let comparisonValue = parseInt(splitInstruction[6], 10);

  let comparisonOperator;

  switch (comparisonSymbol) {
    case '==':
      comparisonOperator = equals;
      break;
    case '!=':
      comparisonOperator = compose(not, equals);
      break;
    case '>':
      comparisonOperator = gt;
      break;
    case '>=':
      comparisonOperator = gte;
      break;
    case '<':
      comparisonOperator = lt;
      break;
    case '<=':
      comparisonOperator = lte;
      break;
  }

  let predicate = createPredicate(registers, comparedRegister, comparisonOperator, comparisonValue);

  if (predicate()) {
    registers[register] = operation(registers[register], value);
  }

  return registers[register];
}

function createPredicate(registers, register, comparisonOperator, value) {
  return () => comparisonOperator(registers[register], value);
}


export function runInstructions(input) {
  let lines = parseInput(input);
  let registers = extractRegisters(lines);
  let allTimeLargest = 0;
  lines.forEach(line => {
    let resultOfInstruction = performInstruction(line, registers);
    if (resultOfInstruction > allTimeLargest) {
      allTimeLargest = resultOfInstruction;
    }
  });
  return {
    allTimeLargest,
    lastLargestValue: findLargestValueInAllRegisters(registers)
  };
}

function findLargestValueInAllRegisters(registers) {
  return Object.keys(registers)
    .reduce((accumulator, key) => {
      if (registers[key] > accumulator.value) {
        accumulator.key = key;
        accumulator.value = registers[key];
      }
      return accumulator;
    }, { key: 'a', value: -Infinity }).value
}

console.log('solution to the first part of the puzzle is:', runInstructions(puzzleInput).lastLargestValue);
console.log('solution to the second part of the puzzle is:', runInstructions(puzzleInput).allTimeLargest);
