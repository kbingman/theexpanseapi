import { atom } from 'recoil';
import { Episode } from '../types';

export const episodesState = atom<Set<Episode>>({
  key: 'episodes',
  default: new Set(),
  // effects_UNSTABLE: [({ setSelf }) => {
  //   console.log('hey');
  // }],
});
