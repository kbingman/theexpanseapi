type ArityOneFn = (arg: any) => any;

type PickLastInTuple<T extends any[]> = T extends [
  ...rest: infer _U,
  argn: infer L
]
  ? L
  : never;

type FirstFnParameterType<T extends any[]> = Parameters<
  PickLastInTuple<T>
>[any];

type LastFnReturnType<T extends any[]> = ReturnType<T[0]>;

/**
 * @param {...fns} a list of function with matching signatures
 *
 * @example
 * compose(fn1, fn2)
 *
 * is the same as fn1(fn2)
 */
export const compose = <T extends ArityOneFn[]>(...fns: T) => (
  p: FirstFnParameterType<T>
): LastFnReturnType<T> => fns.reduceRight((acc: any, cur: any) => cur(acc), p);

/**
 * @param {...fns} a list of function with matching signatures
 *
 * @example
 * pipe(fn1, fn2)
 *
 * is the same as fn2(fn1)
 */
export const pipe = <T extends ArityOneFn[]>(...fns: T) => (
  p: FirstFnParameterType<T>
): LastFnReturnType<T> => fns.reduce((acc: any, cur: any) => cur(acc), p);
