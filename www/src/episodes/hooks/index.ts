import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { episodesState } from '../atoms';
import { Episode } from '../types';

export const useServerSideEpisodes = (episodes: Episode[]) => {
  const [data, setData] = useRecoilState(episodesState);
  useEffect(() => {
    if (!data.size) {
      setData(new Set(episodes));
    }
  }, []);
};
