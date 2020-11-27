type Reducer<T, R> = (acc: R | T[], value: T) => R | T[];

type Transducer<T, R> = (arg: Reducer<T, R>) => Reducer<T, R>;

/**
 * Map transducer
 *
 * @param fn
 *
 * @returns Transducer
 */
export const map = <T, R>(fn: (value: T) => T | R) => (
  reducer: Reducer<T | R, R>
) => (acc: R, value: T) => reducer(acc, fn(value));

/**
 * Filter transducer
 *
 * @param fn
 *
 * @returns transducer
 */
export const filter = <T, R>(predicate: (value: T) => boolean) => (
  reducer: Reducer<T, R>
) => (acc: R, value: T) => {
  if (predicate(value)) {
    return reducer(acc, value);
  }
  return acc;
};

/**
 * Wrapper for reduce function, takes any iterable, not just an Array
 */
// export const reduce = <T, R>(
//   reducer: Reducer<T, R>,
//   seed: R,
//   collection: Iterable<T>
// ) => {
//   let acc = seed;
//   for (const item of collection) {
//     acc = reducer(acc, item);
//   }
//   return acc;
// };

/**
 * Transduce
 */
export const transduce = <T, R>(
  xf: Transducer<T, R>,
  reducer: Reducer<T, R>,
  seed: R | T[],
  collection: Iterable<T>
) => Array.from(collection).reduce(xf(reducer), seed);

export const arrayReducer = <T>(acc: T[], value: T): T[] => [...acc, value];

export const stringReducer = (str: string, char: string) => str + char;

export const objectReducer = <T extends {}, R extends {}>(acc: T, obj: R) => ({
  ...acc,
  ...obj,
});

const isPlainObject = <T extends any>(obj: T) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    return obj as {};
  }
  return null;
};

const isIterable = <T>(iter: any) => {
  if (iter.next) {
    return iter as Iterable<T>; 
  }
  return null;
};

const isArray = <T>(arr: any) => {
  if (Array.isArray(arr)) {
    return arr as T[];
  }
  return null;
};

/**
 * Into Transducer
 */
export const into = <T, R>(
  to: R,
  xf: Transducer<T, R>,
  collection: Iterable<T>
) => {
  if (isArray(to)) {
    return transduce(xf, arrayReducer, [], collection);
  }
  if (isIterable(to)) {
    return transduce(xf, arrayReducer, [], collection);
  }
  if (isPlainObject(to)) {
    return transduce(xf, objectReducer, {} as R, collection);
  }

  throw Error('No matching transducer for `to` object');
};

/**
 * Sequence Transducer
 */
export const sequence = <T, R>(xf: Transducer<T, R>, collection: Iterable<T>) => {
  if (isArray(collection)) {
    return transduce(xf, arrayReducer, [], collection);
  }
  if (isIterable(collection)) {
    return transduce(xf, arrayReducer, [], collection);
  }
  if (isPlainObject(collection)) {
    return transduce(xf, objectReducer, {} as R, collection);
  }

  throw Error('No matching transducer for collection');
};
