import { SpacecraftClass } from '../../classes';
import { Person } from '../../people';

export interface Spacecraft {
  class: string;
  crew: string[];
  name: string;
  ownerNavy: string[]; // TODO
  url: string;
  uuid: string;
}

export interface SpacecraftDetail {
  class: SpacecraftClass;
  className: string;
  crew: Person[];
  name: string;
  owner: string[];
  url: string;
  uuid: string;
}

export interface SpacecraftResponse {
  data: Spacecraft;
  loaded: boolean;
  included: {
    class: SpacecraftClass;
    crew: Person[];
  };
}
