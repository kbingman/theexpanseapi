import { useRecoilValue } from 'recoil';
import { CrewDetail } from '../../people';
import { SpacecraftClass } from '../../classes';
import { spacecraftListState } from '../atoms';

/**
 * Displays a list of Spacecraft
 */
export const SpacecraftDisplay = ({ spacecraft }) => (
  <div>
    {spacecraft.map(({ crew, name, uuid, class: classURL }) => (
      <div key={`spacecraft-${uuid}`}>
        <h2>{name}</h2>
        <SpacecraftClass url={classURL} />
        {crew.map((url: string) => <CrewDetail key={url} url={url} />)}
      </div>
    ))}
  </div>
);

/**
 * Recoil data wrapper
 */
export const SpacecraftList = () => {
  const spacecraft = useRecoilValue(spacecraftListState);
 
  return <SpacecraftDisplay {...{ spacecraft }} />;
};
