type Reducer<T, R> = (acc: R, value: T) => R;

/**
 * Map reducer
 */
export const map = <T, R>(fn: (value: T) => R) => (reducer: Reducer<R, R>) => (
  acc: R,
  value: T
) => reducer(acc, fn(value));

/**
 * Filter reducer
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
 * Wrapper for reduce function
 */
export const reduce = <T, R>(
  reducer: Reducer<T, R>,
  seed: R,
  collection: Iterable<T>
) => {
  let acc = seed;
  for (const item of collection) {
    acc = reducer(acc, item);
  }
  return acc;
};

/**
 * Transduce
 */
export const transduce = <T, R>(
  xf: (arg: Reducer<T, R>) => Reducer<T, R>,
  reducer: Reducer<T, R>,
  seed: R,
  collection: Iterable<T>
) => reduce(xf(reducer), seed, collection);
