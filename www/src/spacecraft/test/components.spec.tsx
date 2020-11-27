import 'next';

import { act, fireEvent, render } from '@testing-library/react';
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
  act(() => {
    fireEvent.click(button);
  });

  const form = await findByLabelText('Name') as HTMLInputElement;
  // const classname = await findByText('Corvette Class');
  console.log(form.value);
  // console.log(classname.tagName);
});
