import { useRecoilValue } from 'recoil';
import { crewDetailState, personIDs } from '../atoms';

export const PeopleList = () => {
  const uuids = useRecoilValue(personIDs);

  return (
    <div>
      {uuids.map((uuid) => (
        <CrewDetail key={uuid} uuid={uuid} />
      ))}
    </div>
  );
};

export const CrewDetail = ({ uuid }) => {
  const crew = useRecoilValue(crewDetailState(uuid));
  if (!crew) {
    return null;
  }

  return <div className="crew-detail">{crew.name}</div>;
};
