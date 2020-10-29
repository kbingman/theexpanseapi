import { atom, selectorFamily } from "recoil";
import { Spacecraft } from "../types";

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

export const removeSpacecraft = selectorFamily({
  key: "removeSpacecraft",
  get: (uuid: string) => ({ get }) => {
    const spacecraft = get(spacecraftState);

    return spacecraft[uuid] || null;
  },
  set: (uuid: string) => ({ get, set }) => {
    // const spacecraft = get(spacecraftState);
    const ids = get(spacecraftIdsState);

    set(
      spacecraftIdsState,
      ids.filter((id) => id !== uuid)
    );
  },
});

/**
 * Spacecraft Selector
 */
export const spacecraftDetailState = selectorFamily({
  key: "spacecraftDetailState",
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
    // const response = await fetchJSON(`/spacecraft/${uuid}`, {
    //   method: "PUT",
    //   body: JSON.stringify(updatedSpacecraft),
    // });
    // console.log(response);

    set(spacecraftState, {
      ...spacecraft,
      [uuid]: updatedSpacecraft,
    });
  },
});
