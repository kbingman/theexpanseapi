import { useRecoilValue } from 'recoil';
import { Cell, Grid } from '../../shared';
import { crewDetailState, personIDs } from '../atoms';

export const PeopleList = () => {
  const uuids = useRecoilValue(personIDs);

  return (
    <Grid>
      {uuids.map((uuid) => (
        <CrewDetail key={uuid} uuid={uuid} />
      ))}
    </Grid>
  );
};

export const CrewDetail = ({ uuid }) => {
  const crew = useRecoilValue(crewDetailState(uuid));
  if (!crew) {
    return null;
  }

  return <Cell>{crew.name}</Cell>;
};
