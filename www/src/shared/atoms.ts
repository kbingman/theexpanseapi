import { atom } from 'recoil';

/**
 * Central error state
 */
export const errorState = atom<string | null>({
  key: '@error/message',
  default: null,
});
