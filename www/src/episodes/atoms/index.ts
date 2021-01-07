import { atom, atomFamily, selector } from 'recoil';
import { map } from '../../shared';
import { Episode } from '../types';

/**
 * Episode Atom, created for each Episode
 */
export const episodeState = atomFamily<Episode | undefined, string>({
  key: '@episodes',
  default: undefined,
});

/**
 * An array of all episodes IDs
 */
export const episodeIDs = atom<string[]>({
  key: '@episodes/ids',
  default: [],
});

const pluckUUID = <T extends { uuid: string }>({ uuid }: T) => uuid;

/**
 * Getter Returns an array of Episodes
 * Setter Accepts an array of Episodes and 
 */
export const episodesListSelector = selector<Episode[]>({
  key: '@episodes/list',
  get: ({ get }) => map((uuid) => get(episodeState(uuid)), get(episodeIDs)),
  set: ({ set }, episodes: Episode[]) => {
    const updateEpisode = (episode: Episode) => set(episodeState(episode.uuid), episode);
    set(episodeIDs, map(pluckUUID, episodes)); 
    map(updateEpisode, episodes);
  },
});
