import { SpacecraftClass } from '../../classes';
import { Person } from '../../people';

export type UUID = string;

export type Spacecraft = {
  class: string;
  crew: string[];
  name: string;
  owner: string[];
  url: string;
  uuid: string;
};

export type SpacecraftDetail = {
  class: SpacecraftClass;
  crew: Person[];
  name: string;
  owner: string[];
  url: string;
  uuid: string;
};
