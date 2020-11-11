// import { SpacecraftClass } from "../classes/types";

export type UUID = string;

export type Spacecraft = {
  class: any;
  crew: string[];
  name: string;
  ownerNavy: string[];
  uuid: string;
};
