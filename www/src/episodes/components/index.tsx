import { useRecoilValue } from 'recoil';
import { episodesState } from '../atoms';

export const EpisodeListing = ({ title, episode, uuid }) => (
  <h2 key={uuid}>
    {title} - {episode}
  </h2>
);

export const EpisodesList = () => {
  const episodes = useRecoilValue(episodesState);
  // Episodes is a set, so we use a custom map function
  return <div>{Array.from(episodes).map(EpisodeListing)}</div>;
};
