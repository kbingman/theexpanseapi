import type { Spacecraft, SpacecraftDetail } from '../types';

export const getUUID = (str: string | null) =>
  (str && str.split('/').pop()) || null;

export const getSpacecraftUuids = (spacecraft: Spacecraft): Spacecraft => ({
  ...spacecraft,
  class: getUUID(spacecraft.class),
  crew: spacecraft.crew.map(getUUID),
});

export const stripSpacecraftModels = (
  detail: SpacecraftDetail
): Spacecraft => ({
  name: detail.name,
  uuid: getUUID(detail.url),
  url: detail.url,
  ownerNavy: detail.owner,
  class: detail.class?.uuid || null,
  crew: detail.crew?.map(({ uuid }) => uuid),
});
