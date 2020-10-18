import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { getEntities } from '../utils';
import { spacecraftIdsState, spacecraftState } from './atoms';

/**
 * Sets the Spacecraft Atom with the given data
 */
export const useLoadSpacecraft = (spacecraft: any[]) => {
  const setSpacecraft = useSetRecoilState(spacecraftState);
  const setSpacecraftIds = useSetRecoilState(spacecraftIdsState);
 
  useEffect(() => {
    const { ids, entities } = getEntities(spacecraft);

    setSpacecraft(entities);
    setSpacecraftIds(ids);
  }, [spacecraft]);
};

