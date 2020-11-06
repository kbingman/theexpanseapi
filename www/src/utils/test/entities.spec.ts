import { getEntities } from "../entities";

const arr = [
  { uuid: "item-1", name: "Me I am Counting" },
  { uuid: "item-2", name: "No More Mister Nice Guy" },
];

test("getEntities", () => {
  const entities = getEntities(arr);
  expect(entities).toEqual({
    entities: {
      "item-1": { uuid: "item-1", name: "Me I am Counting" },
      "item-2": { uuid: "item-2", name: "No More Mister Nice Guy" },
    },
    ids: ["item-1", "item-2"],
  });
});
