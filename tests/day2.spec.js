import { checksum1, checksum2 } from '../src/day2';

describe('checksum1', () => {

  test('solves provided example', () => {
    let input =
    `5 1 9 5
    7 5 3
    2 4 6 8`;
    let expetedOutput = 18;

    expect(checksum1(input)).toBe(expetedOutput);
  });

});

describe('checksum2', () => {

  test('solves provided example', () => {
    let input =
    `5 9 2 8
    9 4 7 3
    3 8 6 5`;
    let expetedOutput = 9;

    expect(checksum2(input)).toBe(expetedOutput);
  });

});
