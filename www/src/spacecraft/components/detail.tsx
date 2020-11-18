import { useRecoilValue } from 'recoil';
import { SpacecraftClass } from '../../classes';
import { CrewDetail } from '../../people';
import { spacecraftDetailState } from '../atoms/atoms';
import { spacecraftListingSelector } from '../atoms/selectors';

/**
 * Spacecraft Class and Crew
 *
 * @returns JSX.Element
 */
export const SpacecraftDetail = ({ uuid }) => {
  // const spacecraft = useRecoilValue(spacecraftListingSelector(uuid));
  const spacecraft = useRecoilValue(spacecraftDetailState(uuid));

  if (!spacecraft) {
    return <p>Loading...</p>;
  }

  const { class: spacecraftClass, crew, owner } = spacecraft;

  return (
    <div className="spacecraft">
      {owner.map((name: string) => (
        <h4 key={name}>{name}</h4>
      ))}
      {spacecraft.name}
      <SpacecraftClass {...spacecraftClass} />
      {/* @ts-ignore */}
      {crew.map(({ name, uuid }) => (
        <CrewDetail key={`crew-${uuid}`} {...{ uuid, name }} />
      ))}
    </div>
  );
};
