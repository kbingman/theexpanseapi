import { atom, selector, selectorFamily } from 'recoil';

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

export const spacecraftLoadingData = atom<Map<string, boolean>>({
  key: '@spacecraft/loading',
  default: new Map(),
});

export const spacecraftLoadingSelector = selectorFamily<boolean, string>({
  key: '@spacecraft/uuid-loading',
  get: (uuid) => ({ get }) => get(spacecraftLoadingData).get(uuid),
  set: (uuid) => ({ get, set }, value) => {
    set(
      spacecraftLoadingData,
      new Map([...get(spacecraftLoadingData), ...new Map([[uuid, value]])])
    );
  },
});
