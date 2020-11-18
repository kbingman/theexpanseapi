import Head from 'next/head';
import Link from 'next/link';
import { RecoilRoot } from 'recoil';

import { getInitializeState } from '../src/shared';

// Mock API
if (process.env.NODE_ENV !== 'production') {
  // require("../mocks");
}

import type { AppProps /*, AppContext */ } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
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
      {/* <DebugObserver /> */}
      <header>
        <h1>The Expanse</h1>
        <Link prefetch href="/">Spacecraft</Link>
        <Link prefetch href="/episodes">Episodes</Link>
      </header>
      <Component {...pageProps} />
    </RecoilRoot>
  </>
);

export default App;
