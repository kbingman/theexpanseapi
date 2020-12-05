import { atom, atomFamily } from 'recoil';
import { Spacecraft, SpacecraftDetail } from '../types';
import { getSpacecraftDetail, getUUID } from '../utils';

/**
 * Base atom for all Spacecraft, creates a Map to hold all 
 * Spacecraft, keyed by UUID
 */
export const spacecraftState = atom<Map<string, Spacecraft>>({
  key: '@spacecraft/map',
  default: new Map(),
});

// /**
//  * Base atom for Spacecraft UUIDs, used for filtering and ordering
//  */
// export const spacecraftIdsState = atom<string[]>({
//   key: '@spacecraft/ids',
//   default: [],
// });

/**
 * Base atom for Spacecraft UUIDs, used for filtering and ordering
 * @param uuid 
 */
export const spacecraftDetailState = atomFamily<
  SpacecraftDetail | null,
  string
>({
  key: '@spacecraft/detail',
  default: null,
  // Gets a spacecraftDetail from the API. Similar to useEffect
  effects_UNSTABLE: (uuid) => [
    ({ setSelf }) => {
      (async () => {
        try {
          const results = await getSpacecraftDetail(uuid);
          setSelf({ ...results, uuid: getUUID(results.url) });
        } catch (err) {
          console.error(err);
          setSelf(null);
        }
      })();
    },
  ],
});
