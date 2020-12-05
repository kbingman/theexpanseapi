import { useRecoilValue } from 'recoil';
import { map } from '../../shared';
import { episodesListSelector } from '../atoms';

/**
 * @param title
 * @param episode
 * @param uuid
 *
 * @returns JSX.Element
 */
export const EpisodeListing = ({ title, episode, uuid }) => (
  <div key={uuid}>
    {episode} - {title}
  </div>
);

/**
 * Renders a list of Episodes
 *
 * @returns JSX.Element
 */
export const EpisodesList = () => {
  const episodes = useRecoilValue(episodesListSelector);
  return <div>{map(EpisodeListing, episodes)}</div>;
};
