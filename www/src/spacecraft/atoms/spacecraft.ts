import { atom, selector, selectorFamily } from "recoil";
import { Spacecraft } from "../types";
import { getSpacecraftDetail } from "../utils";

/**
 * Base atom for all Spacecraft
 */
export const spacecraftState = atom<Record<string, Spacecraft>>({
  key: "spacecraft",
  default: {},
});

/**
 * Base atom for Spacecraft UUIDs, used for filtering and ordering
 */
export const spacecraftIdsState = atom<string[]>({
  key: "spacecraftIds",
  default: [],
});

export const removeSpacecraftSelector = selector({
  key: "removeSpacecraft",
  get: () => null,
  set: ({ get, set }, uuid: string) => {
    const ids = get(spacecraftIdsState).filter((id) => id !== uuid);
    const { [uuid]: removedKey, ...spacecraft } = get(spacecraftState);

    set(spacecraftIdsState, ids);
    set(spacecraftState, spacecraft);
  },
});

export const spacecraftDetailSelector = selectorFamily({
  key: "spacecraftDetailSelector",
  get: (uuid: string) => async () => {
    try {
      const spacecraft = await getSpacecraftDetail(uuid);
      return { spacecraft };
    } catch (err) {
      return { error: err.message };
    }
  },
});

/**
 * Spacecraft Selector
 */
export const spacecraftListingSelector = selectorFamily({
  key: "spacecraftListingSelector",
  get: (uuid: string) => ({ get }) => {
    const spacecraft = get(spacecraftState);
    return spacecraft[uuid] || null;
  },
  set: (uuid: string) => async ({ get, set }, options: Partial<Spacecraft>) => {
    const spacecraft = get(spacecraftState);
    const updatedSpacecraft: Spacecraft = {
      ...spacecraft[uuid],
      ...options,
    };

    set(spacecraftState, {
      ...spacecraft,
      [uuid]: updatedSpacecraft,
    });
  },
});
