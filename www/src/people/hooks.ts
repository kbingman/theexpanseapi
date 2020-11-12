import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { getEntities } from "../shared";
import { crewState } from "./atoms";
import { Person } from "./types";

/**
 * Sets the Spacecraft Atom with the given data
 */
export const useLoadCrew = (crew: Person[]) => {
  const setCrew = useSetRecoilState(crewState);
  useEffect(() => {
    const { entities } = getEntities(crew);

    setCrew(entities);
  }, [crew]);
};
