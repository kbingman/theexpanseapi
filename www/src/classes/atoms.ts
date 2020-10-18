import { atom, selectorFamily } from 'recoil';

export const spacecraftClassState = atom<Record<string, any>>({
  key: 'spacecraftClasses',
  default: {},
});

export const spacecraftClassDetailState = selectorFamily({
  key: 'spacecraftClassDetailState',
  get: (url: string) => ({ get }) => {
    if (!url) {
      return null;
    }
    const classes = get(spacecraftClassState);
    const id = url.split('/').pop();

    return classes[id] || null;
  },
});
