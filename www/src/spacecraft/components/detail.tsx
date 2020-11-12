import { useRecoilValue } from "recoil";
import { SpacecraftClass } from "../../classes";
import { CrewDetail } from "../../people";
import { spacecraftDetailSelector } from "../atoms/spacecraft";

/**
 * Spacecraft Class and Crew
 *
 * @returns JSX.Element
 */
export const SpacecraftDetail = ({ uuid }) => {
  const { spacecraft } = useRecoilValue(spacecraftDetailSelector(uuid));
  if (!spacecraft) {
    return <p>No details available</p>;
  }

  const { class: classUuid, crew: crewUuids, ownerNavy } = spacecraft; 

  return (
    <div className="spacecraft">
      {ownerNavy.map(owner => <h4 key={owner}>{owner}</h4>)}
      <SpacecraftClass uuid={classUuid} />
      {crewUuids.map(uuid => <CrewDetail key={uuid} uuid={uuid} />)}
    </div>
  );
};
