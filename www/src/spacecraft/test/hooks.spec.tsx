import 'next';

import { act, renderRecoilHook } from 'react-recoil-hooks-testing-library';
import { getMockSpacecraft } from '../../../mocks/models';
import { server } from '../../../mocks/server';
import { spacecraftClassState } from '../../classes';
import { spacecraftState } from '../atoms/atoms';
// import { useSetRecoilState } from 'recoil';
// import { getMockSpacecraft } from '../../../mocks/models';

// import { spacecraftIdsState, spacecraftState } from '../atoms/atoms';
import { activeSpacecraftState } from '../atoms/ui';
import { useActiveSpacecraft, useSpacecraftDetail } from '../hooks';

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

test.skip('loads spacecraft', async () => {
  server.listen();
  const mockSpacecraft = getMockSpacecraft();
  const { uuid } = mockSpacecraft;
  const { result, waitForNextUpdate } = renderRecoilHook(
    () => useSpacecraftDetail(uuid),
    {
      states: [
        {
          recoilState: spacecraftState,
          initialValue: {
            [uuid]: mockSpacecraft,
          },
        },
        {
          recoilState: spacecraftClassState,
          initialValue: {},
        },
      ],
    }
  );
  await waitForNextUpdate();
  expect(result.current[0]).toEqual(mockSpacecraft);
  // get crew and class
  await waitForNextUpdate();
});
