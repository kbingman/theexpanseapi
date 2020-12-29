import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { messageState } from '../../shared';

import { getModel, updateModel } from '../api';
import { spacecraftDetailSelector } from '../selectors';
import { SpacecraftResponse } from '../types';

type SetSpacecraftResponse = (response: SpacecraftResponse) => void;

const getSpacecraftDetail = getModel('spacecraft');
const updateSpacecraft = updateModel('spacecraft');

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
  const setMessage = useSetRecoilState(messageState(uuid));

  // Updates the model and any errors that may be sent back
  const handleUpdate = (response: SpacecraftResponse) => {
    if (response.errors?.length) {
      setMessage({ messageType: 'error', message: response.errors[0] });
    } else {
      setResponse(response);
      setMessage({ messageType: 'message', message: '' });
    }
  };

  // The update function, sends a request to the server and sets the response
  const updateAndSetModel = ({ data }: SpacecraftResponse) => {
    setMessage({ messageType: 'message', message: 'Saving...' });
    updateSpacecraft((response: SpacecraftResponse) => {
      handleUpdate({ ...spacecraft, ...response });
    }, data);
  };

  // Loads the API data asynchronously
  useEffect(() => {
    getSpacecraftDetail((response: SpacecraftResponse) => {
      handleUpdate(response);
    }, uuid);
  }, [uuid]);

  return [spacecraft, updateAndSetModel];
};
