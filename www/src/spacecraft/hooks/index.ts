import { useRecoilState, useRecoilValue } from 'recoil';
import { useServerSideModel } from '../../shared/hooks';
// import { useServerSideModel } from '../../shared/hooks';

import { spacecraftState } from '../atoms/atoms';
import { spacecraftIDs } from '../atoms/selectors';
// import { activeSpacecraftSelector } from '../atoms/ui';
import { Spacecraft } from '../types';

// export const useActiveSpacecraft = (uuid: string) => {
//   const [isVisible, setIsVisible] = useRecoilState(
//     activeSpacecraftSelector(uuid)
//   );
//   return { isVisible, setIsVisible };
// };
// 
// export const useSpacecraft = (uuid: string) => {
//   const spacecraft = useRecoilValue(spacecraftListingSelector(uuid));
//   return { spacecraft };
// };

export const useSpacecraftUuids = () => {
  const uuids = useRecoilValue(spacecraftIDs);
  return uuids;
};

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

// export { useSpacecraftDetail } from './use-spacecraft-detail';
