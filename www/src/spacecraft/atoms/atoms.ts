import { atom, atomFamily } from 'recoil';
import { Spacecraft, SpacecraftDetail } from '../types';
import { getSpacecraftDetail } from '../utils';

type SetValue = (spacecraft: SpacecraftDetail) => void;

const fetchSpacecraftAndUpate = async (set: SetValue, uuid: string) => {
  try {
    const results = await getSpacecraftDetail(uuid);
    set(results);
  } catch(err) {
    console.error(err);
    set(null);
  }
};

/**
 * Base atom for all Spacecraft
 */
export const spacecraftState = atom<Record<string, Spacecraft>>({
  key: 'spacecraft',
  default: {},
});

/**
 * Base atom for Spacecraft UUIDs, used for filtering and ordering
 */
export const spacecraftIdsState = atom<string[]>({
  key: 'spacecraftIds',
  default: [],
});

/**
 * Base atom for Spacecraft UUIDs, used for filtering and ordering
 */
export const spacecraftDetailState = atomFamily<SpacecraftDetail | null, string>({
  key: 'spacecraftDetail',
  default: null,
  effects_UNSTABLE: (uuid) => [({ setSelf }) => {
    fetchSpacecraftAndUpate(setSelf, uuid); 
  }],
});
