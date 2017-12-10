import { runInstructions } from '../src/day8';

const sampleInstructions = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`;

describe('runInstructions', () => {

  test('finds the largest value among registers in the supplied example', () => {
    let expectedValue = 1;

    expect(runInstructions(sampleInstructions).lastLargestValue).toBe(expectedValue);
  });

});
