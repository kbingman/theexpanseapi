import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import 'tailwindcss/tailwind.css';

import { DebugObserver } from '../src/debug';
import { getInitializeState, Header } from '../src/shared';

import type { AppProps /*, AppContext */ } from 'next/app';

Amplify.configure({
  ...config,
  ssr: true
});

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
