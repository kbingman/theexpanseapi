import { SpacecraftClass } from '../src/classes/types';
import { Spacecraft } from '../src/spacecraft/types';

export const getMockSpacecraft = (attr?: Partial<Spacecraft>): Spacecraft => ({
  name: 'Rocinante',
  uuid: 'aebf1a71-4349-463b-bec6-c5e65f06ce7f',
  class: '/class/b6a4d0ce-c4e9-4da9-b9d8-42455fd09b45',
  crew: [],
  ownerNavy: [],
  ...attr,
});

export const getMockSpacecraftClass = (attr?: Partial<SpacecraftClass>) => ({
  name: 'Corvette Class',
  uuid: 'b6a4d0ce-c4e9-4da9-b9d8-42455fd09b45',
  ...attr,
});
