import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { spacecraftClassSelector } from '../../classes';
import { crewStateSelector } from '../../people';
import { getEntities, logger } from '../../shared';

import { spacecraftIdsState, spacecraftState } from '../atoms/atoms';
import { spacecraftListingSelector } from '../atoms/selectors';
import { activeSpacecraftSelector } from '../atoms/ui';
import { Spacecraft } from '../types';
import { getSpacecraftDetail } from '../utils';

export const useActiveSpacecraft = (uuid: string) => {
  const [isVisible, setIsVisible] = useRecoilState(
    activeSpacecraftSelector(uuid)
  );
  return { isVisible, setIsVisible };
};

export const useSpacecraft = (uuid: string) => {
  const spacecraft = useRecoilValue(spacecraftListingSelector(uuid));
  return { spacecraft };
};

export const useSpacecraftUuids = () => {
  const uuids = useRecoilValue(spacecraftIdsState);
  return uuids;
};

/**
 * Sets the spacecraft and spacecraft IDs atom if not yet set
 * @param {spacecraft}
 *
 * @returns void
 */
export const useServerSideSpacecraft = (spacecraft: Spacecraft[]) => {
  const [spacecraftIds, setSpacecraftIds] = useRecoilState(spacecraftIdsState);
  const setEntities = useSetRecoilState(spacecraftState);

  useEffect(() => {
    if (!spacecraftIds.length) {
      const { ids, entities } = getEntities(spacecraft);
      setSpacecraftIds(ids);
      setEntities(entities);
    }
  }, []);
};

/**
 * Fetches a spacecraft from the detail API and sets the associated models
 * @param {uuid}
 *
 * @returns void
 */
export const useSpacecraftDetail = (
  uuid: string
): [Spacecraft, (...args: any) => void] => {
  const [spacecraft, setSpacecraft] = useRecoilState<Spacecraft>(
    spacecraftListingSelector(uuid)
  );
  const setSpacecraftClass = useSetRecoilState(spacecraftClassSelector);
  const setSpacecraftCrew = useSetRecoilState(crewStateSelector);

  useEffect(() => {
    (async () => {
      try {
        const response = await getSpacecraftDetail(uuid);
        // TODO update spacecraft here?
        const { entities: crew } = getEntities(response.crew);
        setSpacecraftCrew(crew);
        const { entities: spacecraftClass } = getEntities(
          response.class ? [response.class] : []
        );
        setSpacecraftClass(spacecraftClass);
      } catch (err) {
        logger.error(err);
      }
    })();
  }, [uuid]);

  return [spacecraft, setSpacecraft];
};
