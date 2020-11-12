import { reduce } from "../fp/reduce";

// type Key<T> = keyof T & string;

interface Entities<T> {
  entities: Record<keyof T, T>;
  ids: string[];
}

/**
 * Reducer function
 */
const objectReducer = <T extends { uuid: string }>(acc: Entities<T>, c: T) => ({
  ids: [...acc.ids, c.uuid],
  entities: { ...acc.entities, [c.uuid]: c },
});

/**
 * Converts an Iterable to
 */
export const getEntities = <T extends { uuid: string }>(
  items: T[]
): Entities<T> =>
  reduce(objectReducer, { ids: [], entities: {} } as Entities<T>, items);
