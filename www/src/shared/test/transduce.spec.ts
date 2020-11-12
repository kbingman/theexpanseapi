import { compose } from "../fp/compose";
import { curry } from "../fp/curry";
import { map, filter, transduce } from "../fp/transduce";

// Number function
const doubleTheNumber = (num: number) => 2 * num;
const isEven = (val: number) => val % 2 === 0;
const isNot2 = (val: number) => val !== 2;

// String functions
const toUpper = (str: string) => str.toUpperCase();
const isVowel = (char: string) =>
  ["a", "e", "i", "o", "u", "y"].includes(char.toLowerCase());

const pushReducer = <T>(acc: T[], value: T) => [...acc, value];

const stringReducer = (str: string, char: string) => str + char;

const numberToString = (num: number) => `Number: ${num}`;

// const objectReducer = <T extends { uuid: string }>(
//   acc: Record<string, T>,
//   value: T
// ) => ({ ...acc, [value.uuid]: value });

test("transduce a string", () => {
  const result = transduce(
    compose(map(toUpper), filter(isVowel)),
    stringReducer,
    "",
    "adrian"
  );
  expect(result).toBe("AIA");
});

test("transduce an array", () => {
  const transducer = curry(transduce)(
    compose(filter(isNot2), filter(isEven), map(doubleTheNumber)),
    pushReducer,
    []
  );
  const result = transducer([1, 2, 3, 4]);

  expect(result).toEqual([8]);
});

test("transduce an array and convert type", () => {
  const transducer = curry(transduce)(map(numberToString), pushReducer, []);
  const result = transducer([1, 2]);

  expect(result).toEqual(["Number: 1", "Number: 2"]);
});
