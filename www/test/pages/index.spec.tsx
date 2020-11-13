// Adds the next polyfills... 
// TODO add to a setup file
import 'next';

import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import IndexPage, { getServerSideProps } from '../../pages';
import { getMockSpacecraft } from '../../mocks/models';
import { server } from '../../mocks/server';
import { getInitializeState } from '../../src/spacecraft';

const mockSpacecraft = getMockSpacecraft();
const renderIndexPage = () =>
  render(
    <RecoilRoot initializeState={getInitializeState({ spacecraft: [mockSpacecraft] })}>
      <IndexPage />
    </RecoilRoot>
  );

describe('IndexPage', () => {
  test('renders a list of Spacecraft', () => {
    const { getByText } = renderIndexPage();
    const ship = getByText('Rocinante');

    expect(ship.tagName).toBe('H3');
  });
});

describe('getServerSideProps', () => {
  server.listen();
  test('gets correct props', async () => {
    const { props } = await getServerSideProps();

    expect(props.spacecraft).toEqual([mockSpacecraft])
  });
});
