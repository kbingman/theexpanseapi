import { reduce } from '../fp/reduce';

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
