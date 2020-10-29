import { atom, selectorFamily } from "recoil";
import { Person } from "./types";

export const crewState = atom<Record<string, Person>>({
  key: "crew",
  default: {},
});

export const crewDetailState = selectorFamily({
  key: "crewDetailState",
  get: (uuid: string) => ({ get }) => {
    const crew = get(crewState);

    return crew[uuid] || { name: uuid };
  },
});
