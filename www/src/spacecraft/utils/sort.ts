const ranks = [
  'Admiral',
  'Captain',
  'Commander',
  'Lieutenant',
  'Ensign',
  'Chief',
  'Sargeant',
  'Corporal',
  'Specialist',
];

export const findRankIndex = (name: string) => {
  const index = ranks.findIndex((rank) => !!name.match(rank));
  return index > -1 ? index : 1_000
}

export const sortByRank = <T extends { name: string }>(arr: T[]) => 
  [...arr].sort((a, b) => {
    const indexA = findRankIndex(a.name);
    const indexB = findRankIndex(b.name);

    if (indexA > indexB) {
      return 1;
    }
    if (indexA < indexB) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0
  });

