import { SetterOrUpdater } from 'recoil';
import { logger } from '../shared';
import { Spacecraft, SpacecraftDetail } from './types';
import { getSpacecraftDetail, updateSpacecraft } from './utils/fetch';

export const getDetailAndSetSpacecraft = async (
  set: SetterOrUpdater<SpacecraftDetail>,
  // setError: SetterOrUpdater<any>,
  uuid: string
): Promise<void> => {
  try {
    set(await getSpacecraftDetail(uuid));
    // setError(null);
  } catch (err) {
    logger.error(err);
    set(null);
    // setError(err.message);
  }
};

export const putAndSetSpacecraft = async (
  set: SetterOrUpdater<Spacecraft>,
  spacecraft: Spacecraft
): Promise<void> => {
  try {
    set(await updateSpacecraft(spacecraft.uuid, spacecraft));
  } catch (err) {
    set(null);
    logger.error(err);
    // TODO dispatch error atom here
  }
};
