import { solver2 } from '../src/day1';

describe('solver2', () => {

  test('solves first example', () => {
    let input = '1212';
    let expetedOutput = 6;

    expect(solver2(input)).toBe(expetedOutput);
  });

  test('solves second example', () => {
    let input = '1221';
    let expetedOutput = 0;

    expect(solver2(input)).toBe(expetedOutput);
  });

  test('solves third example', () => {
    let input = '123425';
    let expetedOutput = 4;

    expect(solver2(input)).toBe(expetedOutput);
  });

  test('solves fourth example', () => {
    let input = '123123';
    let expetedOutput = 12;

    expect(solver2(input)).toBe(expetedOutput);
  });

  test('solves fifth example', () => {
    let input = '12131415';
    let expetedOutput = 4;

    expect(solver2(input)).toBe(expetedOutput);
  });

});
