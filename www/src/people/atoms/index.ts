import { atom, selector, selectorFamily } from 'recoil';
import { logger, map, pluckEntity, pluckKey } from '../../shared';
import { Person } from '../types';

export const personState = atom<Map<string, Person>>({
  key: '@people/map',
  default: new Map(),
});

export const personIDs = selector<string[]>({
  key: '@people/ids',
  get: ({ get }) => map(pluckKey, get(personState)),
});

/**
 * Returns an array of people
 */
export const personEntities = selector<Person[]>({
  key: '@people/entities',
  get: ({ get }) => {
    return map(pluckEntity, get(personState));
  },
  set: ({ get, set }, data: Person[]) => {
    const people = get(personState);
    // Sets the data for each person
    data.forEach(d => people.set(d.uuid, d))
    set(personState, people)
  }
});

export const crewDetailState = selectorFamily({
  key: '@people/detail',
  get: (uuid: string) => ({ get }) => {
    return get(personState).get(uuid) || null;
  },
});

export const crewUUIDsState = selectorFamily({
  key: '@people/byUuid',
  get: (uuids: string[]) => ({ get }) => {
    const getPeople = (uuid: string) => get(crewDetailState(uuid));

    return map(getPeople, uuids).filter(Boolean);
  },
});
