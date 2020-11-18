import { SpacecraftList, getSpacecraft, useServerSideSpacecraft } from '../src/spacecraft';

/**
 * IndexPage
 */
const IndexPage = ({ spacecraft, error }) => {
  useServerSideSpacecraft(spacecraft);
  return (
    <div>
      <SpacecraftList />
      {error && <div>{error}</div>}
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const spacecraft = await getSpacecraft();

    // Needed to hydrate the data for the RecoilRoot, see `_app`
    return {
      props: { spacecraft },
    };
  } catch (err) {
    console.error(err);
    return {
      props: { error: err.message },
    };
  }
};

export default IndexPage;
