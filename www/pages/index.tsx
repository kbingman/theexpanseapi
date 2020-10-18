import { useLoadSpacecraft, SpacecraftList } from '../src/spacecraft';
import { useLoadSpacecraftClasses } from '../src/classes';
import { useLoadCrew } from '../src/people';
import { fetchJSON } from '../src/utils';

/**
 * IndexPage
 */
const IndexPage = ({ classes, people, spacecraft }) => {
  useLoadSpacecraft(spacecraft);
  useLoadSpacecraftClasses(classes);
  useLoadCrew(people);

  return (
    <div>
      <h1>Hello World</h1>
      <SpacecraftList />
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    // console.time('request');
    const [classes, people, spacecraft] = await Promise.all([
      fetchJSON('/classes'),
      fetchJSON('/people'),
      fetchJSON('/spacecraft')
    ]);
    // console.timeEnd('request');

    return {
      props: { classes, people, spacecraft }
    };
  } catch (err) {
    console.error(err);
    return {
      props: { data: [], error: err.message }
    };
  }
};

export default IndexPage;
