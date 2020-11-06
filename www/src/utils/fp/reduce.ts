/**
 * Wrapper for reduce function
 */
export const reduce = <T, R>(
  reducer: (acc: R, i: T) => R,
  collection: Iterable<T>,
  seed: R
) => {
  let acc = seed;
  for (const item of collection) {
    acc = reducer(acc, item);
  }
  return acc;
};
