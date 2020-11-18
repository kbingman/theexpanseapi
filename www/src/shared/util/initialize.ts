import { getEntities } from './entities';
import { logger } from './logger';

import { episodesState, Episode } from '../../episodes';

import { spacecraftIdsState, spacecraftState } from '../../spacecraft';
import { getSpacecraftUuids } from '../../spacecraft';
import { Spacecraft } from '../../spacecraft/types';

type InitialProps = {
  episodes?: Episode[];
  spacecraft?: Spacecraft[];
};

export const getInitializeState = ({ episodes, spacecraft }: InitialProps) => ({
  set,
}) => {
  // Initializes the Spacecraft states
  if (spacecraft) {
    const { ids, entities } = getEntities(spacecraft.map(getSpacecraftUuids));
    logger('initialize spacecraft', Date.now());

    set(spacecraftState, entities);
    set(spacecraftIdsState, ids);
  }

  // Initializes the Episodes state
  if (episodes) {
    logger('initialize episodes', Date.now());
    set(episodesState, new Set(episodes));
  }
};
