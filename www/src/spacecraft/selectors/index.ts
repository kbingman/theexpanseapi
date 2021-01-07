import { selector, selectorFamily } from 'recoil';

import { map, pluckKey } from '../../shared';
import { crewUUIDsState, personEntities } from '../../people';
import { spacecraftClassState } from '../../classes';

import { spacecraftState } from '../atoms';
import type { Spacecraft, SpacecraftResponse } from '../types';

import { spacecraftLoadingSelector } from './ui';

/**
 * Gets an Array of spacecraft UUIDs
 * @returns Array of spacecraft IDs
 */
export const spacecraftIDs = selector<string[]>({
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
      errors: [],
      loaded: get(spacecraftLoadingSelector(uuid)),
      included: {
        class: get(spacecraftClassState(spacecraft.class)),
        crew: get(crewUUIDsState(spacecraft.crew)),
      },
    };
  },
  set: (uuid: string) => ({ set }, { data, included, errors }: SpacecraftResponse) => {
    set(spacecraftLoadingSelector(uuid), true);
    if (errors?.length) {
      // set(messageState(uuid), { messageType: 'error', message: errors[0] });
      return;
    }

    set(spacecraftSelector(uuid), data); 
    if (included) {
      set(spacecraftClassState(data.class), included.class);
      set(personEntities, included.crew);
    }
  },
});
