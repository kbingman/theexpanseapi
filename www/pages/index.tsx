import { useLoadSpacecraft, SpacecraftList, getSpacecraft } from "../src/spacecraft";
import { useLoadSpacecraftClasses } from "../src/classes";
import { useLoadCrew } from "../src/people";
import { logger } from "../src/utils";

/**
 * IndexPage
 */
const IndexPage = ({ classes = [], people = [], spacecraft = [], error = null }) => {
  useLoadSpacecraft(spacecraft);
  useLoadSpacecraftClasses(classes);
  useLoadCrew(people);
  logger({ error });

  return (
    <div>
      <h1>Hello World</h1>
      <SpacecraftList />
      {error && <div>{error}</div>}
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    console.time("request");
    const [spacecraft] = await Promise.all([
      // fetchJSON("/classes"),
      // fetchJSON("/people"),
      getSpacecraft(),
    ]);
    console.timeEnd("request");

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
