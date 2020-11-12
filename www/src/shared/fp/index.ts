import { curry } from "./curry";
import { map as mapBase, reduce, asyncMap } from "./reduce";

export const map = curry(mapBase);

export { curry, reduce, asyncMap };
