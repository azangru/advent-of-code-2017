import { calculateNumberOfShuffles } from '../src/day6';

describe('calculateNumberOfShuffles', () => {

  test('finds the number of shuffles in provided example', () => {
    let example = [0, 2, 7, 0];
    let expectedNumberOfShuffles = 5;

    expect(calculateNumberOfShuffles(example).numberOfShuffles).toBe(expectedNumberOfShuffles);
  })

  test('finds loop size in provided example', () => {
    let example = [0, 2, 7, 0];
    let expectedLoopSize = 4;

    expect(calculateNumberOfShuffles(example).loopSize).toBe(expectedLoopSize);
  })

});
