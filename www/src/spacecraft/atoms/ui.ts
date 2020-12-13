import { atom, selector } from 'recoil';

/**
 * Spacecraft Selector
 */
export const activeSpacecraftState = atom<string | null>({
  key: '@spacecraft/active',
  default: null,
});

/**
 * Visibility Selector
 */
export const activeSpacecraftSelector = selector<string>({
  key: '@spacecraft/activeSelector',
  get: ({ get }) => {
    return get(activeSpacecraftState);
  },
  set: ({ set, get }, uuid) => {
    if (uuid === get(activeSpacecraftState)) {
      set(activeSpacecraftState, null);
    } else {
      set(activeSpacecraftState, uuid);
    }
  },
});
