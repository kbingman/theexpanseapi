import { asyncMap, map } from '../util/reduce';

test('map', async () => {
  const double = (num: number) => num * 2;

  expect(map(double, [2, 3])).toEqual([4, 6]);
});

test('map object', async () => {
  const pluck = (obj: { uuid: string }) => obj.uuid;
  const data = [{ uuid: 'foo' }, { uuid: 'bar' }];

  expect(map(pluck, data)).toEqual(['foo', 'bar']);
});

test('async mapper', async () => {
  const asyncDouble = (num: number) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(num * 2), 100);
    });

  expect(await asyncMap(asyncDouble, [2, 3])).toEqual([4, 6]);
});
