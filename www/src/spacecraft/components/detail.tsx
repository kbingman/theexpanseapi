import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { CrewDetail } from '../../people';
import { spacecraftListingSelector } from '../atoms/selectors';
import { getSpacecraftDetail } from '../utils';

const useSpacecraftDetail = (uuid: string) => {
  const [spacecraft /* , setSpacecraft */] = useRecoilState(
    spacecraftListingSelector(uuid)
  );
  useEffect(() => {
    getSpacecraftDetail(uuid).then((r) => console.log(r));
    // setSpacecraft(response);
  }, [uuid]);
  return spacecraft;
};

/**
 * Spacecraft Class and Crew
 *
 * @returns JSX.Element
 */
export const SpacecraftDetail = ({ uuid }) => {
  const spacecraft = useSpacecraftDetail(uuid);
  // const spacecraft = useRecoilValue(spacecraftListingSelector(uuid));
  // const spacecraft = useRecoilValue(spacecraftDetailSelector(uuid));

  if (!spacecraft) {
    return <p>Loading...</p>;
  }

  const { crew, owner } = spacecraft;

  return (
    <div className="spacecraft">
      {owner.map((name: string) => (
        <h4 key={name}>{name}</h4>
      ))}
      {spacecraft.name}
      {/* <SpacecraftClass {...spacecraftClass} /> */}
      {crew.map((uuid) => (
        <CrewDetail key={`crew-${uuid}`} {...{ uuid }} />
      ))}
    </div>
  );
};
