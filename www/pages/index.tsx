import { useLoadSpacecraft, SpacecraftList, getSpacecraft } from "../src/spacecraft";
// import { useLoadSpacecraftClasses } from "../src/classes";
// import { useLoadCrew } from "../src/people";

/**
 * IndexPage
 */
const IndexPage = ({ spacecraft = [], error = null }) => {
  useLoadSpacecraft(spacecraft);
  // useLoadSpacecraftClasses(classes);
  // useLoadCrew(people);

  return (
    <div>
      <h1>The Expanse</h1>
      <SpacecraftList />
      {error && <div>{error}</div>}
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    // console.time("request");
    const [spacecraft] = await Promise.all([
      // fetchJSON("/classes"),
      // fetchJSON("/people"),
      getSpacecraft(),
    ]);
    // console.timeEnd("request");

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
