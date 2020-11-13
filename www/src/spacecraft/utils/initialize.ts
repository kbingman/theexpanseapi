import { getEntities } from "../../shared";

import { spacecraftIdsState, spacecraftState } from "../atoms/spacecraft";
import { getSpacecraftUuids } from "./index";

export const getInitializeState = ({ spacecraft }) => ({ set }) => {
  if (!spacecraft) {
    return;
  }
  const { ids, entities } = getEntities(spacecraft.map(getSpacecraftUuids));
  console.log("initialize state", Date.now());

  set(spacecraftState, entities);
  set(spacecraftIdsState, ids);
};
