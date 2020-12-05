import Head from 'next/head';
import { RecoilRoot } from 'recoil';

import { DebugObserver } from '../src/debug';
import { getInitializeState, Header } from '../src/shared';

import type { AppProps /*, AppContext */ } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => (
  <>
<Head>
    <meta name="description" content="A demo REST API for all things concerning The Expanse TV series" />
      <title>The Expanse Api</title>
    </Head>
    <style jsx global>{`
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
          'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
          'Helvetica Neue', sans-serif;
        margin: 0;
        padding: 0 10px;
      }
    `}</style>
    <RecoilRoot initializeState={getInitializeState({ ...pageProps })}>
      <DebugObserver />
      <Header />
      <Component {...pageProps} />
    </RecoilRoot>
  </>
);

export default App;
