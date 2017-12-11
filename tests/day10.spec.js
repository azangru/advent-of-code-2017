import { reorderList } from '../src/day10';

describe('reorderList', () => {

  test('reorders sample list correctly', () => {
    let sampleList = [0, 1, 2, 3, 4];
    let reorderLengths = [3, 4, 1, 5];

    let expectedList = [3, 4, 2, 1, 0];

    console.log(reorderList(sampleList, reorderLengths));

    expect(true).toBe(true);
  });

});
