import type { Spacecraft } from '../types';

export const getUUID = (str: string | null) => (str && str.split("/").pop()) || null;

export const getSpacecraftUuids = (spacecraft: Spacecraft): Spacecraft => ({
  ...spacecraft,
  class: getUUID(spacecraft.class),
  crew: spacecraft.crew.map(getUUID),
});
