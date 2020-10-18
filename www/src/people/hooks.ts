import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { getEntities } from '../utils';
import { crewState } from './atoms';

/**
 * Sets the Spacecraft Atom with the given data
 */
export const useLoadCrew = (crew: any[]) => {
  const setCrew = useSetRecoilState(crewState);
  useEffect(() => {
    const { entities } = getEntities(crew);

    setCrew(entities);
  }, [crew]);
};
