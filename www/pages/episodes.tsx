import { EpisodesList, useServerSideEpisodes } from '../src/episodes';
import { fetchJSON } from '../src/shared';

/**
 * EpisodesPage
 */
const EpisodesPage = ({ episodes, error = null }) => {
  useServerSideEpisodes(episodes);
  return (
    <div>
      {error && <div>{error}</div>}
      <EpisodesList />
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    console.time('request');
    const episodes = await fetchJSON('/episodes');
    console.timeEnd('request');

    // Needed to hydrate the data for the RecoilRoot, see `_app`
    return {
      props: { episodes },
    };
  } catch (err) {
    console.error(err);
    return {
      props: { error: err.message },
    };
  }
};

export default EpisodesPage;
