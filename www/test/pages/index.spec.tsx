// Adds the nest polyfills... add to a setup file
import 'next';

import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import IndexPage, { getServerSideProps } from '../../pages';
import { getMockSpacecraft, getMockSpacecraftClass } from '../mocks';
import { server } from '../../mocks/server';

const renderIndexPage = () =>
  render(
    <RecoilRoot>
      <IndexPage
        spacecraft={[getMockSpacecraft()]}
      />
    </RecoilRoot>
  );

describe('IndexPage', () => {
  test('renders a list of Spacecraft', () => {
    const { getByText } = renderIndexPage();
    const ship = getByText('Rocinante');
    // const shipClass = getByText('Corvette Class');

    expect(ship.tagName).toBe('H4');
    // expect(shipClass.tagName).toBe('DIV');
  });
});

describe('getServerSideProps', () => {
  server.listen();
  test('gets correct props', async () => {
    const response = await getServerSideProps();
    console.log(response.props.spacecraft); 
  });
});
