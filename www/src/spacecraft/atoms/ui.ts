import { atom, selectorFamily } from "recoil";

/**
 * Spacecraft Selector
 */
export const activeSpacecraftState = atom<string | null>({
  key: "activeSpacecraftState",
  default: null,
});

/**
 * Visibility Selector
 */
export const activeSpacecraftSelector = selectorFamily({
  key: "activeSpacecraftStateSelector",
  get: (currentUuid: string) => ({ get }) => {
    return currentUuid === get(activeSpacecraftState);
  },
  set: (uuid: string) => ({ set, get }, newUuid) => {
    if (uuid === get(activeSpacecraftState)) {
      set(activeSpacecraftState, null);
    } else {
      set(activeSpacecraftState, newUuid);
    }
  },
});
