// import { SpacecraftClass } from "../classes/types";

export type UUID = string;

export type Spacecraft = {
  class: string;
  crew: string[];
  name: string;
  ownerNavy: string[];
  uuid: string;
};
