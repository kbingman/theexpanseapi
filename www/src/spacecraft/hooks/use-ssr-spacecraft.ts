import { useServerSideModel } from '../../shared/hooks';
import { spacecraftState } from '../atoms';
import { Spacecraft } from '../types';

/**
 * Takes an array of spacecraft loaded server side and adds them
 * to the client-side atoms if missing or incomplete
 *
 * This runs only client-side (useEffect)
 * @param spacecraft
 *
 * @returns void
 */
export const useServerSideSpacecraft = (spacecraft: Spacecraft[]) => 
  useServerSideModel<Spacecraft>(spacecraftState, spacecraft);
