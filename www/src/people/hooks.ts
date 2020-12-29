import { useServerSideModel } from '../shared/hooks';
import { personState } from './atoms';
import { Person } from './types';

/**
 * Sets the Person data to a given collection
 * @param people - an array of Persons
 * @returns void
 */
export const useServerSidePeople = (people: Person[]) => 
  useServerSideModel<Person>(personState, people);

