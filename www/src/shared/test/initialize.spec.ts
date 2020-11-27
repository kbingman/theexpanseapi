import { getMockSpacecraft } from '../../../mocks/models';
import { getInitializeState } from '../util/initialize';

test('Initialize State with Spacecraft data', () => {
  const mockSpacecraft = getMockSpacecraft();
  const initializeState = getInitializeState({ spacecraft: [mockSpacecraft] });
  const set = jest.fn();
  initializeState({ set });

  // sets the spacecraft atom
  expect(set).toHaveBeenCalledWith(
    { key: 'spacecraft' },
    {
      [mockSpacecraft.uuid]: {
        ...mockSpacecraft,
        class: mockSpacecraft.class.split('/').pop(),
      },
    }
  );
  // sets the spacecraft IDs atom
  expect(set).toHaveBeenCalledWith({ key: 'spacecraftIds' }, [
    mockSpacecraft.uuid,
  ]);
});
