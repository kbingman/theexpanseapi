import Head from 'next/head';
import Link from 'next/link';
import { RecoilRoot } from 'recoil';

import { DebugObserver } from '../src/debug';
import { getInitializeState } from '../src/shared';

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
      <header>
        <h1>The Expanse</h1>
        <Link href="/">Spacecraft</Link>
        {' | '}
        <Link href="/episodes">Episodes</Link>
      </header>
      <Component {...pageProps} />
    </RecoilRoot>
  </>
);

export default App;
