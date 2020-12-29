import { atom, selector } from 'recoil';
import { map, pluckEntity } from '../../shared';
import { Episode } from '../types';

export const episodesState = atom<Map<string, Episode>>({
  key: '@episodes/map',
  default: new Map(),
});

export const episodesListSelector = selector<Episode[]>({
  key: '@episodes/list',
  get: ({ get }) => map(pluckEntity, get(episodesState)),
});
