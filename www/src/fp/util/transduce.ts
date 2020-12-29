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
) => (acc: R, value: T): R | (R | T)[] => reducer(acc, fn(value));

/**
 * Filter transducer
 *
 * @param predicate the filter test function
 *
 * @returns transducer
 */
export const filter = <T, R>(predicate: (value: T) => boolean) => (
  reducer: Reducer<T, R>
) => (acc: R, value: T): R | T[] => {
  if (predicate(value)) {
    return reducer(acc, value);
  }
  return acc;
};

/**
 * Transduce function - the base transducer function
 * @param xf the transduce fn, can be composed
 * @param reducer a reducer function to map to an object, string or array
 * @param seed the inital value
 * @param collection an Iterable object to map over
 *
 * @returns Array | Object | String depending on 
 */
export const transduce = <T, R>(
  xf: Transducer<T, R>,
  reducer: Reducer<T, R>,
  seed: R | T[],
  collection: Iterable<T>
) => Array.from(collection).reduce(xf(reducer), seed);

/**
 * Array Reducer
 * @param acc the accumulator object, in this case an Array
 * @param value the value to add to the accumulator
 *
 * @returns Array
 */
export const arrayReducer = <T>(acc: T[], value: T): T[] => [...acc, value];

/**
 * Array Reducer
 * @param acc the accumulator object
 * @param value the value to add to the accumulator
 *
 * @returns String
 */
export const stringReducer = (str: string, char: string) => str + char;

/**
 * Array Reducer
 * @param acc the accumulator object, in this case an Object
 * @param value the value to add to the accumulator
 *
 * @returns Object
 */
export const objectReducer = <T extends {}, R extends {}>(acc: T, obj: R) => ({
  ...acc,
  ...obj,
});

const isPlainObject = (obj: unknown) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    return obj as {};
  }
  return null;
};

const isIterable = <T>(iter: any) => {
  if ('next' in iter) {
    return iter as Iterable<T>; 
  }
  return null;
};

const isArray = <T>(arr: unknown) => {
  if (Array.isArray(arr)) {
    return arr as T[];
  }
  return null;
};

/**
 * Into Transducer
 * @param to the initial seed state, either an Array or Plain Object
 * @param xf the transduce function
 * @param collection an Iterable object to traverse over
 *
 * @returns Array | Object depending on input
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
 * @param xf the transduce function
 * @param collection an Iterable object to traverse over
 *
 * @returns Array | Object depending on input
 */
export const sequence = <T, R>(xf: Transducer<T, R>, collection: Iterable<T>) => {
  if (isArray(collection)) {
    return transduce(xf, arrayReducer, [], collection) as R;
  }
  if (isIterable(collection)) {
    return transduce(xf, arrayReducer, [], collection) as R;
  }
  if (isPlainObject(collection)) {
    return transduce(xf, objectReducer, {} as R, collection);
  }

  throw Error('No matching transducer for collection');
};
