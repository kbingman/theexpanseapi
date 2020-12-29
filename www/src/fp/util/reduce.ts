/**
 * Wrapper for reduce function
 */
export const reduce = <T, R>(
  reducer: (acc: R, i: T) => R,
  seed: R,
  collection: Iterable<T>
): R => {
  let acc = seed;
  for (const item of collection) {
    acc = reducer(acc, item);
  }
  return acc;
};

/**
 * Wrapper for reduce function
 */
export const map = <T, R>(fn: (arg: T) => R, collection: Iterable<T>): R[] => {
  // const arr = [];
  // for (const item of collection) {
  //   arr.push(fn(item));
  // }
  // return arr;
  return Array.from(collection).map(fn);
};

/**
 * Async map function
 */
export const asyncMap = async <T, R>(
  fn: (arg: T) => Promise<R>,
  collection: Iterable<T>
): Promise<R[]> => Promise.all(map(fn, collection));
