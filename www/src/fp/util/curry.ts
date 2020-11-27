type Arr = readonly any[];

type SameLength<T extends Arr> = Extract<{ [K in keyof T]: any }, any[]>;

type Curried<A extends Arr, R> = <P extends Partial<A>>(
  ...args: P
) => P extends A
  ? R
  : A extends [...SameLength<P>, ...infer S]
  ? S extends any[]
    ? Curried<S, R>
    : never
  : never;

/**
 * Takes a function with multiple arguments and returns a
 * series of functions with single arguments
 *
 * @example
 * const fn = (a: number, b: number) => a + b;
 * curry(fn) = fn(a: number) => (b: number) => a + b;
 *
 * @param {fn} - a function with 2 or more arguments
 *
 * @returns function
 */
export const curry = <A extends Arr, R>(
  fn: (...args: A) => R
): Curried<A, R> => (...args: Arr): any =>
  args.length >= fn.length
    ? fn(...(args as any))
    : curry((fn as any).bind(null, ...args));
