import { useEffect } from 'react';
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil';
import { errorState } from '../../shared/atoms';
import { getDetailAndSetSpacecraft } from '../api';
import { spacecraftDetailSelector } from '../atoms/selectors';
import { SpacecraftDetail } from '../types';

/**
 * Fetches a spacecraft from the detail API and sets the associated models
 * @param uuid
 *
 * @returns [Spacecraft, RecoilState<SpacecraftDetail>]
 */
export const useSpacecraftDetail = (
  uuid: string
): SetterOrUpdater<SpacecraftDetail> => {
  const setSpacecraftDetail = useSetRecoilState(
    spacecraftDetailSelector(uuid)
  );
  // const setError = useSetRecoilState(errorState);

  useEffect(() => {
    getDetailAndSetSpacecraft(spacecraft => {
      console.log(spacecraft);
    }, uuid);
  }, [uuid]);

  return setSpacecraftDetail;
};
