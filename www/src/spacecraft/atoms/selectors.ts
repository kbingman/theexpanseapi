import { selectorFamily } from 'recoil';
import { spacecraftState } from './atoms';

import type { Spacecraft } from '../types';

/**
 * Spacecraft Summary Selector
 * @param {uuid} spacecraft uuid
 */
export const spacecraftListingSelector = selectorFamily<Spacecraft, string>({
  key: 'spacecraftListingSelector',
  get: (uuid: string) => ({ get }) => {
    return get(spacecraftState)[uuid] || null;
  },
  set: (uuid: string) => ({ get, set }, options) => {
    const spacecraft = get(spacecraftState);
    const updatedSpacecraft: Spacecraft = {
      ...spacecraft[uuid],
      ...options,
    };

    set(spacecraftState, {
      ...spacecraft,
      [uuid]: updatedSpacecraft,
    });
  },
});
