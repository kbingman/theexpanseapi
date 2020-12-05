import { selector, selectorFamily } from 'recoil';
import { getEntities, map, pluckKey } from '../../shared';
import { spacecraftState } from './atoms';

import type { Spacecraft, SpacecraftDetail } from '../types';
import { crewUUIDsState, personEntities } from '../../people';
import { spacecraftClassState } from '../../classes';
import {stripSpacecraftModels} from '../utils';
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
export const spacecraftListingSelector = selectorFamily<Spacecraft, string>({
  key: '@spacecraft/listing',
  get: (uuid: string) => ({ get }) => {
    return get(spacecraftState).get(uuid) || null;
  },
  set: (uuid: string) => ({ get, set }, options: Spacecraft) => {
    const spacecraft = new Map(get(spacecraftState));
    spacecraft.set(uuid, options);

    set(spacecraftState, spacecraft);
  },
});

export const spacecraftDetailSelector = selectorFamily<SpacecraftDetail, string>({
  key: '@spacecraft/detail',
  get: (uuid: string) => ({ get }) => {
    const spacecraft: Spacecraft = get(spacecraftState).get(uuid);
    const crew = get(crewUUIDsState(spacecraft.crew));
    return {
      ...spacecraft,
      crew,
      class: null,
    }
  },
  set: (uuid: string) => ({ get, set }, options: SpacecraftDetail) => {
    const spacecraft = new Map(get(spacecraftState));
    spacecraft.set(uuid, stripSpacecraftModels(options));
    // const { entities: spacecraftClass } = getEntities(
    //   options.class ? [options.class] : []
    // );
    // set(spacecraftClassState, spacecraftClass);
    // set(spacecraftClassState, options.class);
    set(personEntities, options.crew);
    set(spacecraftState, spacecraft);
  },
});
