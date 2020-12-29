import { useEffect } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import { createMapFromArray } from './util/entities';

/**
 * Takes an array loaded server side and adds it
 * to the client-side atoms if missing.
 *
 * This runs only client-side (useEffect)
 * 
 * @param entitiesState The Recoil atom holding the entities Map
 * @param collection The collection with which to populate the data
 *
 * @returns void
 */
export const useServerSideModel = <T extends { uuid: string }>(
  entitiesState: RecoilState<Map<string, T>>,
  collection: T[] = [],
) => {
  const [entities, setEntities] = useRecoilState<Map<string, T>>(entitiesState);

  useEffect(() => {
    if (entities.size < collection.length) {
      setEntities(createMapFromArray(collection));
    }
  }, []);
};
