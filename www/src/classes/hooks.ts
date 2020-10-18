import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { getEntities } from '../utils';
import { spacecraftClassState } from './atoms';

/**
 * Sets the Spacecraft Class Atom with the given data
 */
export const useLoadSpacecraftClasses = (classes: any[]) => {
  const setClasses = useSetRecoilState(spacecraftClassState);
 
  useEffect(() => {
    const { entities } = getEntities(classes);

    setClasses(entities);
  }, [classes]);
};

