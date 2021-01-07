import { atom, atomFamily, selector } from 'recoil';
import { map, pluckUUID } from '../shared';
import { SpacecraftClass } from './types';

export const spacecraftClassState = atomFamily<SpacecraftClass | null, string>({
  key: '@class/entities',
  default: null,
});

export const spacecraftClassIDs = atom<string[]>({
  key: '@class/ids',
  default: [],
})

export const spacecraftClassListSelector = selector<SpacecraftClass[]>({
  key: '@class/selector',
  get: ({ get }) => map((uuid) => get(spacecraftClassState(uuid)), get(spacecraftClassIDs)),
  set: ({ get, set }, data: SpacecraftClass[]) => {
    const updateClass = (spacecraft: SpacecraftClass) => set(spacecraftClassState(spacecraft.uuid), spacecraft);
    set(spacecraftClassIDs, [get(spacecraftClassIDs), ...map(pluckUUID, data)]); 
    map(updateClass, data);
  },
});
