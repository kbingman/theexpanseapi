import { snapshot_UNSTABLE } from 'recoil';
import { getMockSpacecraft } from '../../../mocks/models';
import { spacecraftState } from '../atoms/atoms';
import { spacecraftListingSelector } from '../atoms/selectors';

test('spacecraftListingSelector', () => {
  const mockSpacecraft = getMockSpacecraft();
  const { uuid } = mockSpacecraft;
  const initialSnapshot = snapshot_UNSTABLE();

  expect(initialSnapshot.getLoadable(spacecraftState).valueOrThrow()).toEqual(
    {}
  );

  const testSnapshot = snapshot_UNSTABLE(({ set }) =>
    set(spacecraftState, { [uuid]: mockSpacecraft })
  );
  expect(
    testSnapshot.getLoadable(spacecraftListingSelector(uuid)).valueOrThrow()
  ).toEqual(mockSpacecraft);
});
