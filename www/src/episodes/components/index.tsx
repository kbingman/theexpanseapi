import { useRecoilValue } from 'recoil';
import { H2, P, map, Cell, Grid } from '../../shared';
import { episodesListSelector } from '../atoms';
import { Episode } from '../types';

/**
 * @param title
 * @param episode
 * @param uuid
 *
 * @returns JSX.Element
 */
export const EpisodeListing = ({
  description,
  episode,
  title,
  uuid,
}: Episode) => (
  <Cell key={uuid}>
    <H2>
      {episode} - {title}
    </H2>
    <P>{description}</P>
  </Cell>
);

/**
 * Renders a list of Episodes
 *
 * @returns JSX.Element
 */
export const EpisodesList = () => {
  const episodes = useRecoilValue(episodesListSelector);
  return <Grid>{map(EpisodeListing, episodes)}</Grid>;
};
