import { useEffect, useMemo } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";

import { getEntities } from "../../shared";

import {
  spacecraftListingSelector,
  spacecraftIdsState,
  spacecraftState,
} from "../atoms/spacecraft";
import { activeSpacecraftSelector } from "../atoms/ui";
import { Spacecraft } from "../types";

const getUUID = (str: string | null) => (str && str.split("/").pop()) || null;

const getSpacecraftUuids = (spacecraft: Spacecraft): Spacecraft => ({
  ...spacecraft,
  class: getUUID(spacecraft.class),
  crew: spacecraft.crew.map(getUUID),
});

/**
 * Sets the Spacecraft Atom with the given data
 */
export const useLoadSpacecraft = (spacecraft: Spacecraft[]) => {
  const setSpacecraft = useSetRecoilState(spacecraftState);
  const setSpacecraftIds = useSetRecoilState(spacecraftIdsState);

  useEffect(() => {
    const { ids, entities } = getEntities(spacecraft.map(getSpacecraftUuids));

    setSpacecraft(entities);
    setSpacecraftIds(ids);
  }, [spacecraft]);
};

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
