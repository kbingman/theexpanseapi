import { useRecoilValue } from 'recoil';
import { map } from '../../shared';
import { episodesState } from '../atoms';

export const EpisodeListing = ({ title, episode, uuid }) => (
  <h3 key={uuid}>
    {title} - {episode}
  </h3>
);

export const EpisodesList = () => {
  const episodes = useRecoilValue(episodesState);
  return (
    <div>{map(EpisodeListing, episodes)}</div>
  );
};
