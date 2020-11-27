import { logger } from '../src/shared';
import { SpacecraftList, getSpacecraft, useServerSideSpacecraft } from '../src/spacecraft';

/**
 * IndexPage
 */
const IndexPage = ({ spacecraft, error }) => {
  // Sets Recoil State if not already set
  useServerSideSpacecraft(spacecraft);
  return (
    <div>
      <SpacecraftList />
      {error && <div>{error}</div>}
    </div>
  );
};

/**
 * Server Side props
 * Runs only on the server, providind data to the frontend
 */
export const getServerSideProps = async () => {
  try {
    const spacecraft = await getSpacecraft();

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

export default IndexPage;
