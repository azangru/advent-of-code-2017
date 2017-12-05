import {
  findNumberOfStepsToExecuteInstructions,
  plusOne,
  calculateSolution2
} from '../src/day5';

describe('findNumberOfStepsToExecuteInstructions', () => {

  test('solves the first provided example', () => {
    let example = `
    0
    3
    0
    1
    -3`;
    let expectedNumberOfSteps = 5;

    expect(findNumberOfStepsToExecuteInstructions(example, plusOne)).toBe(expectedNumberOfSteps);
  })

  test('solves the second provided example', () => {
    let example = `
    0
    3
    0
    1
    -3`;
    let expectedNumberOfSteps = 10;

    expect(calculateSolution2(example)).toBe(expectedNumberOfSteps);
  });

})
