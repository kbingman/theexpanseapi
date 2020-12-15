import { Suspense, useEffect, useState } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';

import { spacecraftDetailState } from '../atoms/atoms';
import { spacecraftDetailSelector, spacecraftIDs } from '../atoms/selectors';
import { SpacecraftForm } from './form';
import { useSpacecraftDetail } from '../hooks';
import { logger } from '../../shared';

interface SpacecraftListingProps {
  uuid: string;
  setActiveUUID: SetterOrUpdater<string>;
}

/**
 * Displays Spacecraft modal
 * @param uuid
 * @param setActiveUUID
 *
 * @returns JSX.Element
 */
export const SpacecraftModal = ({
  uuid,
  setActiveUUID,
}: SpacecraftListingProps) => {
  useSpacecraftDetail(uuid);
  const spacecraft = useRecoilValue(spacecraftDetailState(uuid));
  const [data, setData] = useState({
    ...spacecraft,
    owner: spacecraft?.owner.join(', '),
  });

  const updateKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const { name, owner, crew, className } = data;
  const toggleModal = (_: React.MouseEvent) => {
    setActiveUUID(uuid);
  };
  const updateModel = (e: React.FormEvent) => {
    e.preventDefault();
    // logger('request goes here');
    // setSpacecraft({ ...data, owner: data.owner.split(', ') });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SpacecraftForm
        {...{
          className,
          crew,
          name,
          owner,
          updateModel,
          toggleModal,
          updateKey,
        }}
      />
    </Suspense>
  );
};
