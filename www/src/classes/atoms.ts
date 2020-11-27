import { atom, selector, selectorFamily } from 'recoil';
import { SpacecraftClass } from './types';

type SpacecraftClasses = { [uuid: string]: SpacecraftClass };

export const spacecraftClassState = atom<SpacecraftClasses>({
  key: 'classes',
  default: {},
});

export const spacecraftClassSelector = selector<SpacecraftClasses>({
  key: 'spacecraftClassSelector',
  get: ({ get }) => get(spacecraftClassState),
  set: ({ get, set }, value) =>
    set(spacecraftClassState, {
      ...get(spacecraftClassState),
      ...value,
    }),
});

export const spacecraftClassDetailState = selectorFamily({
  key: 'spacecraftClassDetailState',
  get: (uuid: string) => ({ get }) => {
    if (!uuid) {
      return null;
    }
    const classes = get(spacecraftClassState);

    return classes[uuid] || null;
  },
});
