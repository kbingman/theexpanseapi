import { atom, selector } from 'recoil';

export const spacecraftState = atom<Record<string, any>>({
  key: 'spacecraft',
  default: {},
});

export const spacecraftIdsState = atom<string[]>({
  key: 'spacecraftIds',
  default: [],
});

/**
 * Spacecraft Selector
 */
export const spacecraftListState = selector({
  key: 'spacecraftListState',
  get: ({ get }) => {
    const spacecraft = get(spacecraftState);
    const ids = get(spacecraftIdsState);

    return ids.map(id => spacecraft[id]);
  }, 
});

