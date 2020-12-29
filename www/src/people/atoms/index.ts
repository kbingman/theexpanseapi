import { atom, selector, selectorFamily } from 'recoil';
import { logger, map, pluckEntity, pluckKey } from '../../shared';
import { getUUID } from '../../spacecraft';
import { sortByRank } from '../util/sort';
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
    set(
      personState,
      new Map([...get(personState), ...new Map(data.map((d) => [d.uuid, d]))])
    );
  },
});

export const crewDetailState = selectorFamily({
  key: '@people/detail',
  get: (uuid: string) => ({ get }) => {
    return get(personState).get(getUUID(uuid));
  },
});

export const crewUUIDsState = selectorFamily({
  key: '@people/byUuid',
  get: (uuids: string[]) => ({ get }) => {
    const getPeople = (uuid: string) => get(crewDetailState(getUUID(uuid)));
    // return map(getPeople, uuids).filter(Boolean);
    const people = uuids.reduce((acc, uuid) => {
      const crew = getPeople(getUUID(uuid));
      if (crew) {
        acc.push(crew);
      }
      return acc;
    }, []);

    return sortByRank(people);
  },
});
