import { snapshot_UNSTABLE } from 'recoil';
import { getMockSpacecraft } from '../../../mocks/models';
import { spacecraftListingSelector } from '../../spacecraft/atoms/selectors';
import { getModifiedNodes } from '../util/nodes';

test('filter the modified nodes', () => {
  const mockSpacecraft = getMockSpacecraft();
  const { uuid } = mockSpacecraft;
  const snapshot = snapshot_UNSTABLE(({ set }) => {
    set(spacecraftListingSelector(uuid), mockSpacecraft);
  });
  const nodes = getModifiedNodes(snapshot);

  expect(nodes).toEqual([
    {
      key: '@spacecraft/entities',
      contents: { [uuid]: mockSpacecraft },
    },
  ]);
});
