import { snapshot_UNSTABLE } from 'recoil';
import { getMockSpacecraft } from '../../../mocks/models';
import { spacecraftState } from '../atoms/atoms';
import { spacecraftSelector } from '../atoms/selectors';

test('get spacecraftListingSelector', () => {
  const mockSpacecraft = getMockSpacecraft({ name: 'Rocinante' });
  const { uuid } = mockSpacecraft;
  const initialSnapshot = snapshot_UNSTABLE();

  expect(initialSnapshot.getLoadable(spacecraftState).valueOrThrow()).toEqual(
    {}
  );

  const testSnapshot = snapshot_UNSTABLE(({ set }) =>
    set(spacecraftSelector(uuid), mockSpacecraft)
  );
  expect(
    testSnapshot.getLoadable(spacecraftSelector(uuid)).valueOrThrow()
  ).toEqual(mockSpacecraft);
});

test('set spacecraftListingSelector', () => {
  // Creates a mock spacecraft with the wrong name
  const mockSpacecraft = getMockSpacecraft({ name: 'rocinant' });
  const { uuid } = mockSpacecraft;
  const initialSnapshot = snapshot_UNSTABLE(({ set }) => {
    set(spacecraftSelector(uuid), mockSpacecraft);
  });

  expect(initialSnapshot.getLoadable(spacecraftState).valueOrThrow()).toEqual({
    [uuid]: mockSpacecraft,
  });

  const testSnapshot = snapshot_UNSTABLE(({ set }) =>
    set(spacecraftSelector(uuid), {
      ...mockSpacecraft,
      name: 'Rocinante',
    })
  );
  expect(
    testSnapshot.getLoadable(spacecraftSelector(uuid)).valueOrThrow()
      .name
  ).toBe('Rocinante');
});
