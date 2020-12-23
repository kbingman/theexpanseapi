import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { getModel, updateModel } from '../api';
import { spacecraftDetailSelector } from '../atoms/selectors';
import { Spacecraft, SpacecraftResponse } from '../types';

type SetSpacecraftResponse = (response: SpacecraftResponse) => void;

const updateSpacecraft = updateModel('spacecraft');
const getSpacecraftDetail = getModel('spacecraft');

/**
 * Fetches a spacecraft from the detail API and sets the associated models
 * returns a tuple with the response data from the API request and a setter
 * function that first updates the API then updates state as well
 * 
 * @param uuid
 *
 * @returns [SpacecraftResponse, SetSpacecraftResponse]
 */
export const useSpacecraftDetail = (
  uuid: string
): [SpacecraftResponse, SetSpacecraftResponse] => {
  const [spacecraft, setResponse] = useRecoilState(
    spacecraftDetailSelector(uuid)
  );

  // The update function, sends a request to the server and sets the response
  const updateAndSetSpacecraft = ({ data }: SpacecraftResponse) => {
    updateSpacecraft((response: Spacecraft) => {
      setResponse({ ...spacecraft, data: response });
    }, data);
  };

  // Loads the API data asynchronously
  useEffect(() => {
    getSpacecraftDetail((spacecraft: SpacecraftResponse) => {
      setResponse(spacecraft);
    }, uuid);
  }, [uuid]);

  return [spacecraft, updateAndSetSpacecraft];
};
