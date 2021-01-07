import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { episodesListSelector } from '../atoms';
import { Episode } from '../types';

/**
 * Takes an array of episodes loaded server side and adds them
 * to the client-side atoms if missing. This is imported as a separate 
 * module so as to encapsulate dependencies.
 * 
 * This runs only client-side (useEffect)
 * 
 * @param {episodes}
 */
export const useServerSideEpisodes = (episodes: Episode[]) => {
  const [entities, setEntities] = useRecoilState(episodesListSelector);

  useEffect(() => {
    if (entities.length < episodes.length) {
      setEntities(episodes);
    }
  }, []);
};
