import { countScore } from '../src/day9.js';

describe('countScore', () => {

  test('calculates scores in sample examples', () => {
    let sample1 = '{}';
    let sample2 = '{{{}}}';
    let sample3 = '{{},{}}';
    let sample4 = '{{{},{},{{}}}}';
    let sample5 = '{<a>,<a>,<a>,<a>}';
    let sample6 = '{{<ab>},{<ab>},{<ab>},{<ab>}}';
    let sample7 = '{{<!!>},{<!!>},{<!!>},{<!!>}}';
    let sample8 = '{{<a!>},{<a!>},{<a!>},{<ab>}}';

    let expectedResult1 = 1;
    let expectedResult2 = 6;
    let expectedResult3 = 5;
    let expectedResult4 = 16;
    let expectedResult5 = 1;
    let expectedResult6 = 9;
    let expectedResult7 = 9;
    let expectedResult8 = 3;

    expect(countScore(sample1).currentScore).toBe(expectedResult1);
    expect(countScore(sample2).currentScore).toBe(expectedResult2);
    expect(countScore(sample3).currentScore).toBe(expectedResult3);
    expect(countScore(sample4).currentScore).toBe(expectedResult4);
    expect(countScore(sample5).currentScore).toBe(expectedResult5);
    expect(countScore(sample6).currentScore).toBe(expectedResult6);
    expect(countScore(sample7).currentScore).toBe(expectedResult7);
    expect(countScore(sample8).currentScore).toBe(expectedResult8);
  });

  test('counts the number of characters within garbage', () => {
    let sample1 = '<>';
    let sample2 = '<random characters>';
    let sample3 = '<<<<>';
    let sample4 = '<{!>}>';
    let sample5 = '<!!>';
    let sample6 = '<!!!>>';
    let sample7 = '<{o"i!a,<{i<a>';

    expect(countScore(sample1).garbageCharactersCount).toBe(0);
    expect(countScore(sample2).garbageCharactersCount).toBe(17);
    expect(countScore(sample3).garbageCharactersCount).toBe(3);
    expect(countScore(sample4).garbageCharactersCount).toBe(2);
    expect(countScore(sample5).garbageCharactersCount).toBe(0);
    expect(countScore(sample6).garbageCharactersCount).toBe(0);
    expect(countScore(sample7).garbageCharactersCount).toBe(10);    
  });

});
