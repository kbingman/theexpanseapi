import { EpisodesList, useServerSideEpisodes } from '../src/episodes';
import { fetchJSON, logger } from '../src/shared';

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
    const episodes = await fetchJSON('/episodes');

    // Needed to hydrate the data for the RecoilRoot, see `_app`
    return {
      props: { episodes },
    };
  } catch (err) {
    logger.error(err);
    return {
      props: { error: err.message },
    };
  }
};

export default EpisodesPage;
