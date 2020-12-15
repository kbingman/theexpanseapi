import { selector, selectorFamily } from 'recoil';
import { map, pluckKey } from '../../shared';
import { spacecraftDetailState, spacecraftState } from './atoms';

import type { Spacecraft, SpacecraftDetail } from '../types';
import { crewUUIDsState, personEntities } from '../../people';
import { getUUID, sortByRank, stripSpacecraftModels } from '../utils';
import { spacecraftClassDetailState, spacecraftClassState } from '../../classes';

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
    const spacecraft = get(spacecraftState).get(uuid);
    if (!spacecraft) {
      return null;
    }
    return {
      ...spacecraft,
      owner: spacecraft.ownerNavy,
    };
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
export const spacecraftDetailSelector = selectorFamily<
  SpacecraftDetail,
  string
>({
  key: '@spacecraft/detail',
  get: (uuid: string) => ({ get }) => {
    const spacecraft: Spacecraft = get(spacecraftState).get(uuid);
    // const detail = get(spacecraftDetailState(uuid));
    const crew = get(crewUUIDsState(map(getUUID, spacecraft.crew)));
    const spacecraftClass = get(
       spacecraftClassDetailState(getUUID(spacecraft.class))
    );
    return {
      ...spacecraft,
      class: spacecraftClass,
      className: spacecraftClass?.name || null,
      crew: sortByRank(crew),
      owner: spacecraft?.ownerNavy
    };
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
