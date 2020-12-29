import { createMapFromArray } from './entities';
import { logger } from './logger';

import { SpacecraftClass, spacecraftClassState } from '../../classes';
import { episodesState, Episode } from '../../episodes';
import { personState, Person } from '../../people';
import { spacecraftState } from '../../spacecraft';
import { Spacecraft } from '../../spacecraft/types';

type InitialProps = {
  classes?: SpacecraftClass[];
  episodes?: Episode[];
  people?: Person[];
  spacecraft?: Spacecraft[];
};

/**
 * Initializes Recoil state data from the server side fetch
 *
 * @param episodes optional an array of Episode data
 * @param people optional an array of Person data
 * @param spacecraft optional an array of Spacecraft data
 *
 * @returns void
 */
export const getInitializeState = ({
  classes,
  episodes,
  people,
  spacecraft,
}: InitialProps) => ({ set }) => {
  // Initializes the Spacecraft states
  if (classes) {
    logger('initialize classes', Date.now());
    set(spacecraftClassState, createMapFromArray(classes));
  }

  // Initializes the Spacecraft states
  if (spacecraft) {
    logger('initialize spacecraft', Date.now());
    set(spacecraftState, createMapFromArray(spacecraft));
  }

  // cInitializes the Episodes state
  if (people) {
    logger('initialize people', Date.now());
    set(personState, createMapFromArray(people));
  }

  // Initializes the Episodes state
  if (episodes) {
    logger('initialize episodes', Date.now());
    set(episodesState, createMapFromArray(episodes));
  }
};
