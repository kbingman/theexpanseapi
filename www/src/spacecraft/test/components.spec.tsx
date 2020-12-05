import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { getMockSpacecraft } from '../../../mocks/models';
import { server } from '../../../mocks/server';
import { getInitializeState } from '../../shared';
import { SpacecraftList } from '../components/listing';

const rocinante = getMockSpacecraft();

const initializeState = getInitializeState({ spacecraft: [rocinante] });

test('Spacecraft', async () => {
  server.listen();
  const { findByText, findByLabelText } = render(
    <RecoilRoot {...{ initializeState }}>
      <SpacecraftList />
    </RecoilRoot>
  );

  const title = await findByText('Rocinante');
  const button = await findByText('Show Details');

  expect(title.tagName).toBe('H2');
  expect(button.tagName).toBe('BUTTON');
  fireEvent.click(button);

  // waitFor(() => 3000)
  const nameInput = await findByLabelText('Name') as HTMLInputElement; 
  expect(nameInput.value).toBe('Rocinante');
  await new Promise((res) => setTimeout(() => res(), 3000));
  
  const classname = await findByText('Corvette Class');
  console.log(classname.tagName);
});
