import { curry } from '../util/curry';
import { compose } from '../util/compose';
import {
  map,
  filter,
  transduce,
  arrayReducer,
  stringReducer,
  objectReducer,
  into,
  sequence,
} from '../util/transduce';

// Number function
const doubleTheNumber = (num: number) => 2 * num;
const isEven = (val: number) => val % 2 === 0;
const isNot2 = (val: number) => val !== 2;

// String functions
const toUpper = (str: string) => str.toUpperCase();
const isVowel = (char: string) =>
  ['a', 'e', 'i', 'o', 'u', 'y'].includes(char.toLowerCase());

const numberToString = (num: number) => `Number: ${num}`;

test('transduce a string', () => {
  const result = transduce(
    compose(map(toUpper), filter(isVowel)),
    stringReducer,
    '',
    'adrian'
  );
  expect(result).toBe('AIA');
});

test('transduce an array', () => {
  const result = transduce(
    compose(map(doubleTheNumber), filter(isEven), filter(isNot2)),
    arrayReducer,
    [],
    [1, 2, 3, 4]
  );

  expect(result).toEqual([8]);
});

test('transduce an array and convert type', () => {
  const result = transduce(map(numberToString), arrayReducer, [], [1, '2']);

  expect(result).toEqual(['Number: 1', 'Number: 2']);
});

test('transduce an object', () => {
  const uuidToKey = <T extends { uuid: string }>(
    obj: T
  ): Record<string, T> => ({
    [obj.uuid]: obj,
  });
  const result = transduce(map(uuidToKey), objectReducer, {}, [
    { uuid: 'foo' },
    { uuid: 'bar' },
  ]);

  expect(result).toEqual({
    bar: { uuid: 'bar' },
    foo: { uuid: 'foo' },
  });
});

test('transduce into object', () => {
  const uuidToKey = <T extends { uuid: string }>(
    obj: T
  ): Record<string, T> => ({
    [obj.uuid]: obj,
  });
  const result = into({}, map(uuidToKey), [{ uuid: 'foo' }, { uuid: 'bar' }]);

  expect(result).toEqual({
    bar: { uuid: 'bar' },
    foo: { uuid: 'foo' },
  });
});

test('transduce an array and convert type', () => {
  const result = sequence(map(numberToString), [1, '2']);

  expect(result).toEqual(['Number: 1', 'Number: 2']);
});

test('transduce an array and convert type', () => {
  const numberMapper = curry(sequence)(map(numberToString));
  const result = numberMapper([1, 2]);

  expect(result).toEqual(['Number: 1', 'Number: 2']);
});
