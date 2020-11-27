import { curry } from '../util/curry';

const fn = (a: string, b: number, c: boolean) =>
  a.length <= b === c ? 'yep' : 'nope';

const cfn = curry(fn);

test('curry', () => {
  const strFn = cfn('test');
  expect(strFn(5, true)).toBe('yep');
  expect(strFn(2)(true)).toBe('nope');
});
