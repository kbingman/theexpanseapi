import { fetchJSON, logger } from '../shared';

type Setter<T> = (arg: T) => void;

type Errors = { errors: string[] };

/**
 * @param name 
 * Ceates a fetch function to retrieve a resource once given the base model 
 * name
 *
 */
export const getModel = (name: string) => async <T>(
  set: Setter<T | Errors>,
  uuid: string
): Promise<void> => {
  try {
    set(await fetchJSON(`/${name}/${uuid}`));
  } catch (err) {
    logger.error(err);
    set({ errors: [err.message] });
  }
};

/**
 * @param name 
 * Create an update function given a resource name
 *
 */
export const updateModel = (name: string) => async <T extends { uuid: string }>(
  set: Setter<T | Errors>,
  model: T
): Promise<void> => {
  try {
    set(await fetchJSON(`/${name}/${model.uuid}`, {
      method: 'PUT',
      body: JSON.stringify(model)
    }));
  } catch (err) {
    logger.error(err);
    set({ errors: [err.message] });
  }
};
