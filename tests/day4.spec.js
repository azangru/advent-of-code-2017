import { hasNoDuplicates, hasNoAnagrams } from '../src/day4';

describe('hasNoDuplicates', () => {

  test('identifies lines with no duplicate strings', () => {
    let example1 = ['aa', 'bb', 'cc', 'dd', 'ee'];
    let example2 = ['aa', 'bb', 'cc', 'dd', 'aa'];
    let example3 = ['aa', 'bb', 'cc', 'dd', 'aaa'];

    expect(hasNoDuplicates(example1)).toBe(true);
    expect(hasNoDuplicates(example2)).toBe(false);
    expect(hasNoDuplicates(example3)).toBe(true);
  })

})

describe('hasNoAnagrams', () => {

  test('identifies phrases without anagrams', () => {
    let example1 = ['abcde', 'fghij'];
    let example2 = ['abcde', 'xyz', 'ecdab'];
    let example3 = ['a', 'ab', 'abc', 'abd', 'abf', 'abj'];
    let example4 = ['iiii', 'oiii', 'ooii', 'oooi', 'oooo'];
    let example5 = ['oiii', 'ioii', 'iioi', 'iiio'];

    expect(hasNoAnagrams(example1)).toBe(true);
    expect(hasNoAnagrams(example2)).toBe(false);
    expect(hasNoAnagrams(example3)).toBe(true);
    expect(hasNoAnagrams(example4)).toBe(true);
    expect(hasNoAnagrams(example5)).toBe(false);
  });

})
