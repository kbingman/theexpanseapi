import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { getEntities } from "../utils";
import { spacecraftClassState } from "./atoms";
import { SpacecraftClass } from "./types";

/**
 * Sets the Spacecraft Class Atom with the given data
 */
export const useLoadSpacecraftClasses = (classes: SpacecraftClass[]) => {
  const setClasses = useSetRecoilState(spacecraftClassState);

  useEffect(() => {
    const { entities } = getEntities(classes);

    setClasses(entities);
  }, [classes]);
};
