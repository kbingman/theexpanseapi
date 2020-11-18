import { act, renderRecoilHook } from 'react-recoil-hooks-testing-library';
import { useSetRecoilState } from 'recoil';
import { getMockSpacecraft } from '../../../mocks/models';

import { spacecraftIdsState, spacecraftState } from '../atoms/atoms';
import { removeSpacecraftSelector } from '../atoms/selectors';
import { activeSpacecraftState } from '../atoms/ui';
import { useActiveSpacecraft } from '../hooks';

// const mockSpacecraft = getMockSpacecraft();

test('checks if current uuid is selected', () => {
  const { result } = renderRecoilHook(() => useActiveSpacecraft('uuid'), {
    states: [{ recoilState: activeSpacecraftState, initialValue: 'uuid' }],
  });

  expect(result.current.isVisible).toBe(true);
  act(() => {
    result.current.setIsVisible('uuid');
  });
  expect(result.current.isVisible).toBe(false);
});

// test('removes object associated with UUID', () => {
//   const { result } = renderRecoilHook(
//     () => useSetRecoilState(removeSpacecraftSelector),
//     {
//       states: [
//         { recoilState: spacecraftState, initialValue: mockSpacecraft },
//         {
//           recoilState: spacecraftIdsState,
//           initialValue: [mockSpacecraft.uuid],
//         },
//       ],
//     }
//   );
//
//   act(() => {
//     result.current(mockSpacecraft.uuid);
//   });
//   // expect(result.current.isVisible).toBe(false);
// });
