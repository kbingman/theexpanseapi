import { atom, selector, selectorFamily } from 'recoil';
import { SpacecraftClass } from './types';

type SpacecraftClassMap = Map<string, SpacecraftClass>;

export const spacecraftClassState = atom<SpacecraftClassMap>({
  key: '@class/entities',
  default: new Map(),
});

export const spacecraftClassSelector = selector<SpacecraftClassMap>({
  key: '@class/selector',
  get: ({ get }) => get(spacecraftClassState),
  set: ({ get, set }, value: SpacecraftClassMap) => {
    set(
      spacecraftClassState,
      new Map([...get(spacecraftClassState), ...value])
    );
  },
});

export const spacecraftClassDetailState = selectorFamily<SpacecraftClass, string>({
  key: '@class/detail',
  get: (uuid: string) => ({ get }) => {
    return get(spacecraftClassState).get(uuid) || null;
  },
  set: (uuid: string) => ({ get, set }, value: SpacecraftClass) => {
    set(
      spacecraftClassState,
      new Map([...get(spacecraftClassState), ...new Map([[uuid, value]])])
    );
  },
});
