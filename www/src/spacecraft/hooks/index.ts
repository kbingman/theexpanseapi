import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getEntities } from '../../shared';

import { spacecraftIdsState, spacecraftState } from '../atoms/atoms';
import { spacecraftListingSelector } from '../atoms/selectors';
import { activeSpacecraftSelector } from '../atoms/ui';
import { Spacecraft } from '../types';

export const useActiveSpacecraft = (uuid: string) => {
  const [isVisible, setIsVisible] = useRecoilState(
    activeSpacecraftSelector(uuid)
  );
  return { isVisible, setIsVisible };
};

export const useSpacecraft = (uuid: string) => {
  const [spacecraft, setSpacecraft] = useRecoilState(
    spacecraftListingSelector(uuid)
  );
  return { spacecraft, setSpacecraft };
};

export const useSpacecraftUuids = () => {
  const uuids = useRecoilValue(spacecraftIdsState);
  return uuids;
};

export const useServerSideSpacecraft = (spacecraft: Spacecraft[]) => {
  const [ids, setIds] = useRecoilState(spacecraftIdsState);
  const setEntities = useSetRecoilState(spacecraftState);

  useEffect(() => {  
    if (!ids.length) {
      const data = getEntities(spacecraft);
      setIds(data.ids);
      setEntities(data.entities);
    }
  }, []);
};
