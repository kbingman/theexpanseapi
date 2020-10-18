interface Entities<T> {
  entities: Record<keyof T, T>,
  ids: (string | keyof T)[],
};

export const getEntities = <T extends { uuid: string }>(items: T[]): Entities<T> =>
  items.reduce((acc, c) => ({
    ids: [...acc.ids, c.uuid],
    entities: { ...acc.entities, [c.uuid]: c }
  }), { ids: [], entities: {} } as Entities<T>);

