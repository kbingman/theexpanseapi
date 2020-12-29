import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import 'tailwindcss/tailwind.css';

import { DebugObserver } from '../src/debug';
import { getInitializeState, Header } from '../src/shared';

import type { AppProps /*, AppContext */ } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta
        name="description"
        content="A demo REST API for all things concerning The Expanse TV series"
      />
      <title>The Expanse Api</title>
    </Head>
    <RecoilRoot initializeState={getInitializeState({ ...pageProps })}>
      <DebugObserver />
      <Header />
      <Component {...pageProps} />
    </RecoilRoot>
  </>
);

export default App;
