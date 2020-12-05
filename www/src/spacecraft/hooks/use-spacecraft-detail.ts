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
): [SpacecraftDetail, SetterOrUpdater<SpacecraftDetail>] => {
  const [spacecraftDetail, setSpacecraftDetail] = useRecoilState(
    spacecraftDetailSelector(uuid)
  );
  const setError = useSetRecoilState(errorState);

  useEffect(() => {
    getDetailAndSetSpacecraft(setSpacecraftDetail, setError, uuid);
  }, [uuid]);

  return [spacecraftDetail, setSpacecraftDetail];
};
