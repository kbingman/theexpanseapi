import { useState } from 'react';
import { SetterOrUpdater } from 'recoil';

import { SpacecraftForm } from './form';
import { useSpacecraftDetail } from '../hooks';
import { CloseButton, Modal, Overlay } from '../../shared';
import { ClassData } from './class';
import { CrewData } from './crew';

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
  const [spacecraft, setSpacecraft] = useSpacecraftDetail(uuid);

  // TODO Replace with Recoil State
  const [data, setData] = useState(spacecraft.data);
  const { name } = data;

  const updateKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const toggleModal = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setActiveUUID(uuid);
  };
  const updateModel = (e: React.FormEvent) => {
    e.preventDefault();
    setSpacecraft({ ...spacecraft, data });
  };

  return (
    <Overlay>
      {spacecraft.loaded ? (
        <Modal>
          <CloseButton onClick={toggleModal} />
          <SpacecraftForm
            {...{
              name,
              // owner,
              updateModel,
              updateKey,
            }}
          />
          <ClassData uuid={spacecraft.data.class} />
          <CrewData uuids={spacecraft.data.crew} />
        </Modal>
      ) : (
        <div className="text-sm">Loading...</div>
      )}
    </Overlay>
  );
};
