import { useEffect, useMemo } from 'react';
import { useRecoilSnapshot, useGotoRecoilSnapshot, useRecoilCallback } from 'recoil';
import { RecoilRoot } from "recoil";

import { useLoadSpacecraftClasses } from "../src/classes";
import { useLoadCrew } from "../src/people";
import { useLoadSpacecraft, SpacecraftList, getSpacecraft, getSpacecraftUuids, spacecraftState } from "../src/spacecraft";
import { fetchJSON, getEntities } from "../src/shared";
import { getSpacecraftClasses } from "../src/classes/fetch";
import { spacecraftIdsState } from '../src/spacecraft/atoms/spacecraft';

const InitializeState = ({ spacecraft }) => {
  const snapshot = useRecoilSnapshot();

  useMemo(() => {
    snapshot.map(({ set }) => {
      const { ids, entities } = getEntities(spacecraft.map(getSpacecraftUuids));
      console.log('init', Date.now()); 
      set(spacecraftState, entities);
      set(spacecraftIdsState, ids);
    });
    // const initializedSnapshot = await snapshot.mapAsync(initializeStateAsync);
    // gotoSnapshot(initializedSnapshot);
    // setLoaded(true);
  }, []);
  
  return null;
}

/**
 * IndexPage
 */
const IndexPage = ({ spacecraft = [], classes = [], people = [], error = null }) => {
  const initializeState = ({ set }) => {
    const { ids, entities } = getEntities(spacecraft.map(getSpacecraftUuids));
    console.log('base', Date.now()); 
 
    set(spacecraftState, entities);
    set(spacecraftIdsState, ids);
  }

  return (
    <div>
      <RecoilRoot initializeState={initializeState}>
      <h1>The Expanse</h1>
      <InitializeState {...{ spacecraft }}/>
      <SpacecraftList />
      {error && <div>{error}</div>}
      </RecoilRoot>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    console.time("request");
    const [spacecraft] = await Promise.all([
      // getSpacecraftClasses(),
      // fetchJSON("/people"),
      getSpacecraft(),
    ]);
    console.timeEnd("request");

    return {
      props: { spacecraft },
    };
  } catch (err) {
    console.error(err);
    return {
      props: { error: err.message },
    };
  }
};

export default IndexPage;
