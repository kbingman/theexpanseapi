import { compose } from './util/compose';
import { curry } from './util/curry';

import {
  // map as mapBase,
  reduce as reduceBase,
  asyncMap as asyncMapBase,
} from './util/reduce';

export const asyncMap = curry(asyncMapBase);
// export const map = curry(mapBase);
export const reduce = curry(reduceBase);

/**
 * Transducers methods
 */
export {
  filter,
  map,
  into,
  sequence,
  transduce,
  arrayReducer,
  objectReducer,
} from './util/transduce';

export { compose, curry };
