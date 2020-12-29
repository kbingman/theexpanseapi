import { atom } from 'recoil';
import { Spacecraft } from '../types';

/**
 * Base atom for all Spacecraft, creates a Map to hold all 
 * Spacecraft, keyed by UUID
 */
export const spacecraftState = atom<Map<string, Spacecraft>>({
  key: '@spacecraft/map',
  default: new Map(),
});

/**
 * Active spacecraft selector
 */
export const activeSpacecraftState = atom<string | null>({
  key: '@spacecraft/active',
  default: null,
});


// /**
//  * Base atom for Spacecraft UUIDs, used for filtering and ordering
//  * @param uuid 
//  */
// export const spacecraftDetailState = atomFamily<
//   SpacecraftDetail | null,
//   string
// >({
//   key: '@spacecraft/detail',
//   default: null,
// });

// /**
//  * Base error atom 
//  * @param uuid 
//  */
// export const errorState = atomFamily<string | null, string>({
//   key: '@error/state',
//   default: null,
// });
