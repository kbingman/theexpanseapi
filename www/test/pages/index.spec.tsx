// Adds the nest polyfills... add to a setup file
import 'next';

import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import IndexPage, { getServerSideProps } from '../../pages';
import { getMockSpacecraft } from '../../mocks/models';
import { server } from '../../mocks/server';

const mockSpacecraft = getMockSpacecraft();
const renderIndexPage = () =>
  render(
    <RecoilRoot>
      <IndexPage
        spacecraft={[mockSpacecraft]}
      />
    </RecoilRoot>
  );

describe('IndexPage', () => {
  test('renders a list of Spacecraft', () => {
    const { getByText } = renderIndexPage();
    const ship = getByText('Rocinante');
    // const shipClass = getByText('Corvette Class');

    expect(ship.tagName).toBe('H3');
    // expect(shipClass.tagName).toBe('DIV');
  });
});

describe('getServerSideProps', () => {
  server.listen();
  test('gets correct props', async () => {
    const { props } = await getServerSideProps();

    expect(props.spacecraft).toEqual([mockSpacecraft])
  });
});
