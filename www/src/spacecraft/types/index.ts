// import { SpacecraftClass } from "../classes/types";

import { SpacecraftClass } from "../../classes/types";
import { Person } from "../../people/types";

export type UUID = string;

export type Spacecraft = {
  class: string;
  crew: string[];
  name: string;
  ownerNavy: string[];
  uuid: string;
};

export type SpacecraftDetail = {
  class: SpacecraftClass;
  crew: Person[];
  name: string;
  owner: string[];
  uuid: string;
};
