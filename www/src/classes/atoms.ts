import { atom, selectorFamily } from "recoil";
import { SpacecraftClass } from "./types";

export const spacecraftClassState = atom<Record<string, SpacecraftClass>>({
  key: "spacecraftClasses",
  default: {},
});

export const spacecraftClassDetailState = selectorFamily({
  key: "spacecraftClassDetailState",
  get: (uuid: string) => ({ get }) => {
    if (!uuid) {
      return null;
    }
    const classes = get(spacecraftClassState);

    return classes[uuid] || null;
  },
});
