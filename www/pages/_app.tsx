import Head from "next/head";
import { RecoilRoot } from "recoil";

import { getInitializeState } from "../src/spacecraft";

// Mock API
if (process.env.NODE_ENV !== "production") {
  // require("../mocks");
}

import type { AppProps /*, AppContext */ } from "next/app";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>The Expanse Api</title>
    </Head>
    <style jsx global>{`
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
          "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
          "Helvetica Neue", sans-serif;
        margin: 0;
        padding: 0 10px;
      }
    `}</style>
    <RecoilRoot initializeState={getInitializeState({ spacecraft: pageProps.spacecraft })}>
      {/* <DebugObserver /> */}
      <Component {...pageProps} />
    </RecoilRoot> 
  </>
);

export default App;
