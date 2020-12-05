import { reduce } from '../../fp';

// type Key<T> = keyof T & string;

interface Entities<T> {
  entities: Record<keyof T, T>;
  ids: string[];
}

/**
 * Reducer function
 */
const objectReducer = <T extends { uuid: string }>(
  acc: Entities<T>,
  value: T
) => ({
  ids: [...acc.ids, value.uuid],
  entities: { ...acc.entities, [value.uuid]: value },
});

/**
 * Converts an Iterable to
 */
export const getEntities = <T extends { uuid: string }>(
  items: T[]
): Entities<T> =>
  reduce(objectReducer, { ids: [], entities: {} } as Entities<T>, items);

// // export const createKeyValuePairs = <T extends { uuid: string }>(
//   arr: Iterable<T>
// ): [string, T][] => map((item) => [item.uuid, item], arr);

export const map = <T, R>(fn: (arg: T) => R, iter: Iterable<T>): R[] =>
  Array.from(iter).map(fn);

/**
 * Utility method for working with the array of tuples created by Maps
 * @param entity key / value pair for the entry
 *
 * @returns value
 */
export const pluckEntity = <T>([_key, value]: [string, T]): T => value;

/**
 * Utility method for working with the array of tuples created by Maps
 * @param entity key / value pair for the entry
 *
 * @returns key
 */
export const pluckKey = ([key, _value]: [string, unknown]): string => key;

/**
 * Utility method for working with the array of tuples created by Maps
 * @param entity an object with a UUID key 
 *
 * @returns Tuple of with a UUID / Entry pair
 */
export const getUUIDValuePairs = <T extends { uuid: string }>(
  item: T
): [string, T] => [item.uuid, item];

/**
 * Creates a Map from an Array
 * @param entities an object with a UUID key 
 *
 * @returns Map
 */
export const createMapFromArray = <T extends { uuid: string }>(
  iter: Iterable<T>
): Map<string, T> => new Map(map(getUUIDValuePairs, iter));

