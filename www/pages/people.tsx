import { PeopleList } from '../src/people';
import { fetchJSON, logger } from '../src/shared';
import { useServerSidePeople } from '../src/people/hooks';

/**
 * EpisodesPage
 */
const PeoplePage = ({ people, error = null }) => {
  useServerSidePeople(people);
  return (
    <div>
      {error && <div>{error}</div>}
      <PeopleList />
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const people = await fetchJSON('/people');

    // Needed to hydrate the data for the RecoilRoot, see `_app`
    return {
      props: { people },
    };
  } catch (err) {
    logger.error(err);
    return {
      props: { error: err.message },
    };
  }
};

export default PeoplePage;
