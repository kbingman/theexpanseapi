import { SpacecraftList, getSpacecraft } from "../src/spacecraft";

/**
 * IndexPage
 */
const IndexPage = ({ error = null }) => (
  <div>
    <h1>The Expanse</h1>
    <SpacecraftList />
    {error && <div>{error}</div>}
  </div>
);

export const getServerSideProps = async () => {
  try {
    console.time("request");
    const spacecraft = await getSpacecraft();
    console.timeEnd("request");

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
