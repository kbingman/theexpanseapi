import { atom, selectorFamily } from 'recoil';

export const crewState = atom({
  key: 'crew',
  default: {},
});

export const crewDetailState = selectorFamily({
  key: 'crewDetailState',
  get: (url: string) => ({ get }) => {
    const crew = get(crewState);
    const id = url.split('/').pop();

    return crew[id] || { name: url };
  },
});
