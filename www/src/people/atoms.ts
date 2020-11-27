import { atom, selector, selectorFamily } from 'recoil';
import { Person } from './types';

type CrewState = { [uuid: string]: Person };

export const crewState = atom<CrewState>({
  key: 'crew',
  default: {},
});

export const crewStateSelector = selector<CrewState>({
  key: 'crewStateSelector',
  get: ({ get }) => get(crewState),
  set: ({ get, set }, value) =>
    set(crewState, {
      ...get(crewState),
      ...value,
    }),
});

export const crewDetailState = selectorFamily({
  key: 'crewDetailState',
  get: (uuid: string) => ({ get }) => {
    const crew = get(crewState);

    return crew[uuid] || null;
  },
});
