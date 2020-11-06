import { reduce } from "./fp/reduce";

interface Entities<T> {
  entities: Record<keyof T, T>;
  ids: string[];
}

/**
 * Converts an Iterable to
 */
export const getEntities = <T extends { uuid: string }>(
  items: T[]
): Entities<T> =>
  reduce(
    (acc, c) => ({
      ids: [...acc.ids, c.uuid],
      entities: { ...acc.entities, [c.uuid]: c },
    }),
    items,
    { ids: [], entities: {} } as Entities<T>
  );
