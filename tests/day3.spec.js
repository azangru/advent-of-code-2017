import {
  fillMatrix,
  findManhattanDistanceFromCenter,
  incrementNextNumberByOne,
  getSumOfAdjacentNumbers,
  isGreaterNumberReached
} from '../src/day3';

describe('fillMatrix', () => {

  test('builds a spiral matrix incrementing each next number by 1', () => {
    let { matrix } = fillMatrix(23, incrementNextNumberByOne);

    let expectedResult = [
      [17, 16, 15, 14, 13],
      [18, 5, 4, 3, 12],
      [19, 6, 1, 2, 11],
      [20, 7, 8, 9, 10],
      [21, 22, 23, null, null]
    ];

    expect(matrix).toEqual(expectedResult);
  });

  // test.only('builds a spiral matrix using sum of adjacent numbers', () => {
  //   let { matrix } = fillMatrix(806, getSumOfAdjacentNumbers, isGreaterNumberReached);
  //
  //   let expectedResult = [
  //     [147, 142,  133,  122,  59],
  //     [304,   5,   4,  2,  57],
  //     [330,  10,   1,   1,  54],
  //     [351,  11,  23,  25,   26],
  //     [362, 747,  806, null, null]
  //   ];
  //
  //   expect(matrix).toEqual(expectedResult);
  // });

});

describe('findManhattanDistanceFromCenter', () => {

  test('calculates distance between a given number and the center of the matrix', () => {
    expect(findManhattanDistanceFromCenter(12)).toBe(3);
    expect(findManhattanDistanceFromCenter(23)).toBe(2);
    expect(findManhattanDistanceFromCenter(1024)).toBe(31);
  })

});
