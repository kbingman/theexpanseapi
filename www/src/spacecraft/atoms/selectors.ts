import { selector, selectorFamily } from 'recoil';
import { map, pluckKey } from '../../shared';
import { spacecraftState } from './atoms';

import type { Spacecraft, SpacecraftResponse } from '../types';
import { crewUUIDsState, personEntities } from '../../people';
import { getUUID } from '../utils';
import { spacecraftClassDetailState } from '../../classes';
import { spacecraftLoadingSelector } from './ui';

/**
 * Gets an Array of spacecraft UUIDs
 * @returns Array of spacecraft IDs
 */
export const spacecraftIDs = selector({
  key: '@spacecraft/ids',
  get: ({ get }) => map(pluckKey, get(spacecraftState)),
});

/**
 * Spacecraft Summary Selector
 * @param uuid spacecraft uuid
 */
export const spacecraftSelector = selectorFamily<Spacecraft, string>({
  key: '@spacecraft/listing',
  get: (uuid: string) => ({ get }) => {
    return get(spacecraftState).get(uuid);
  },
  set: (uuid: string) => ({ get, set }, options: Spacecraft) => {
    const spacecraft = new Map(get(spacecraftState));
    spacecraft.set(uuid, options);

    set(spacecraftState, spacecraft);
  },
});

/**
 * Spacecraft Summary Selector
 * @param uuid spacecraft uuid
 */
export const spacecraftDetailSelector = selectorFamily<SpacecraftResponse, string>({
  key: '@spacecraft/detail',
  get: (uuid: string) => ({ get }) => {
    const spacecraft = get(spacecraftSelector(uuid));

    return {
      data: spacecraft,
      loaded: get(spacecraftLoadingSelector(uuid)),
      included: {
        class: get(spacecraftClassDetailState(spacecraft.class)),
        crew: get(crewUUIDsState(spacecraft.crew)),
      },
    };
  },
  set: (uuid: string) => ({ set }, { data, included }: SpacecraftResponse) => {
    set(spacecraftLoadingSelector(uuid), true);
    set(spacecraftClassDetailState(data.class), included?.class);
    set(personEntities, included?.crew);
    set(spacecraftSelector(uuid), data);
  },
});
