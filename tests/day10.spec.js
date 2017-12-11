import {
  reorderList,
  validateReorderedList
} from '../src/day10';

describe('reorderList', () => {

  test('reorders sample list correctly', () => {
    let sampleList = [0, 1, 2, 3, 4];
    let reorderLengths = [3, 4, 1, 5];

    let expectedList = [3, 4, 2, 1, 0];

    expect(reorderList(sampleList, reorderLengths)).toEqual(expectedList);
  });

});

describe('validate reordered list', () => {

  test('checks checksum of sample reordered list', () => {
    let sampleList = [0, 1, 2, 3, 4];
    let reorderLengths = [3, 4, 1, 5];

    let reorderedList = reorderList(sampleList, reorderLengths);

    expect(validateReorderedList(reorderedList)).toEqual(12);    
  })

})
