import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';

import { TextButton, H2 } from '../../shared';
import { spacecraftIDs, spacecraftSelector } from '../selectors';
import { activeSpacecraftSelector } from '../selectors/ui';
import { SpacecraftModal } from './modal';

const SpacecraftClassName = ({ name }: { name: string }) => {
  if (!name) {
    return null;
  }
  return <span className="text-gray-700">({name})</span>;
};

/**
 * Displays a single Spacecraft
 * @param name
 * @param owner
 * @param toggleModal
 *
 * @returns JSX.Element
 */
export const SpacecraftListingDisplay = ({
  name,
  // owner,
  toggleModal,
}) => (
  <div className="px-1 py-0 m-1 bg-gray-100">
    <H2>
      {name}
      <TextButton onClick={toggleModal}>Edit</TextButton>
    </H2>
    {/* owner.map((name: string) => (
      <H3 key={`owner-${name}`} className="truncate">
        {name}
      </H3>
          )) */}
  </div>
);

interface SpacecraftListingProps {
  uuid: string;
  setActiveUUID: SetterOrUpdater<string>;
}

/**
 * Displays a single Spacecraft
 * @param uuid
 *
 * @returns JSX.Element
 */
export const SpacecraftListing = ({
  uuid,
  setActiveUUID,
}: SpacecraftListingProps) => {
  const spacecraft = useRecoilValue(spacecraftSelector(uuid));
  if (!spacecraft) {
    return null;
  }
  const { name } = spacecraft;
  const toggleModal = (_: React.MouseEvent) => {
    setActiveUUID(uuid);
  };

  return <SpacecraftListingDisplay {...{ name, toggleModal }} />;
};

/**
 * Recoil data wrapper
 *
 * @returns JSX.Element
 */
export const SpacecraftList = () => {
  const uuids = useRecoilValue(spacecraftIDs);
  const [activeUUID, setActiveUUID] = useRecoilState(activeSpacecraftSelector);

  return (
    <>
      {activeUUID && (
        <SpacecraftModal uuid={activeUUID} setActiveUUID={setActiveUUID} />
      )}

      {uuids.map((uuid) => (
        <SpacecraftListing
          key={`spacecraft-${uuid}`}
          {...{ uuid, setActiveUUID }}
        />
      ))}
    </>
  );
};
