import { useRecoilValue } from 'recoil';
import { SpacecraftClassInfo } from '../../classes';
import { CrewDetail } from '../../people';
import { spacecraftIDs } from '../atoms/selectors';
import { useActiveSpacecraft, useSpacecraft } from '../hooks';
import { SpacecraftDisplay } from './form';

/**
 * Displays a single Spacecraft
 * @oaram uuid
 *
 * @returns JSX.Element
 */
export const SpacecraftListing = ({ uuid }: { uuid: string }) => {
  const { spacecraft } = useSpacecraft(uuid);
  if (!spacecraft) {
    return null;
  }
  const { name } = spacecraft;
  const { isVisible, setIsVisible } = useActiveSpacecraft(uuid);
  const label = isVisible ? 'Hide' : 'Show';

  return (
    <div>
      <div>
        {name}
        <button onClick={() => setIsVisible(uuid)}>{label} Details</button>
      </div>
      {isVisible && (
        <>
          <SpacecraftDisplay {...{ uuid }} />
        </>
      )}
    </div>
  );
};

/**
 * Recoil data wrapper
 *
 * @returns JSX.Element
 */
export const SpacecraftList = () => {
  const uuids = useRecoilValue(spacecraftIDs);

  return (
    <div>
      {uuids.map((uuid) => (
        <SpacecraftListing key={`spacecraft-${uuid}`} uuid={uuid} />
      ))}
    </div>
  );
};
