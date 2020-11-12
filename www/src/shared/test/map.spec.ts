import { asyncMap, map } from "../fp/reduce";

test("map", async () => {
  const double = (num: number) => num * 2;

  expect(map(double, [2, 3])).toEqual([4, 6]);
});

test("Async mapper", async () => {
  const asyncDouble = (num: number) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(num * 2), 100);
    });

  expect(await asyncMap(asyncDouble, [2, 3])).toEqual([4, 6]);
});
