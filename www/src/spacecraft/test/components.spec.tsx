import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { getMockSpacecraft } from '../../../mocks/models';
import { getInitializeState } from '../../shared';
import { SpacecraftList } from '../components/listing';

const rocinante = getMockSpacecraft();

const initializeState = getInitializeState({ spacecraft: [rocinante] });

test('Spacecraft', () => {
  const { getByText } = render(
    <RecoilRoot {...{ initializeState }}>
      <SpacecraftList />
    </RecoilRoot>
  );

  const title = getByText('Rocinante');
  const button = getByText('Show Details');

  expect(title.tagName).toBe('H3');
  expect(button.tagName).toBe('BUTTON');
});
