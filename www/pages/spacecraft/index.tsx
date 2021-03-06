import { useServerSidePeople } from '../../src/people/hooks';
import { fetchJSON, logger } from '../../src/shared';
import {
  SpacecraftList,
  useServerSideSpacecraft,
} from '../../src/spacecraft';

/**
 * IndexPage
 */
const SpacecraftPage = ({ people, spacecraft, error }) => {
  // Sets Recoil State if not already set
  useServerSideSpacecraft(spacecraft);
  useServerSidePeople(people);
  return (
    <div>
      <SpacecraftList />
    </div>
  );
};

/**
 * Server Side props
 * Runs only on the server, providind data to the frontend
 */
export const getServerSideProps = async () => {
  try {
    const [spacecraft] = await Promise.all([
      fetchJSON('/spacecraft'),
    ]);

    // Needed to hydrate the data for the RecoilRoot, see `_app`
    return {
      props: { spacecraft },
    };
  } catch (err) {
    logger.error(err);
    return {
      props: { error: err.message },
    };
  }
};

export default SpacecraftPage;
