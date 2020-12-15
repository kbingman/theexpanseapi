import { sortByRank, findRankIndex } from '../../utils/sort';

test('findRankIndex', () => {
  const result = findRankIndex('Amos Burton');
  expect(result).toBe(1000);
});

test('sortByRank', () => {
  const names = [
    { name: 'Amos Burton' },
    { name: 'Jim Holden' },
    { name: 'Captain Sandrine' },
    { name: 'Admiral Souther' },
    { name: 'Admiral Nguyễn' },
  ];
  expect(sortByRank(names)).toEqual([
    { name: 'Admiral Nguyễn' },
    { name: 'Admiral Souther' },
    { name: 'Captain Sandrine' },
    { name: 'Amos Burton' },
    { name: 'Jim Holden' },
  ]);
});
