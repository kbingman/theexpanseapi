import { fetchJSON, logger } from '../shared';

type Setter<T> = (arg: T) => void;

export const getModel = (name: string) => async <T>(
  set: Setter<T>,
  uuid: string
): Promise<void> => {
  try {
    set(await fetchJSON(`/${name}/${uuid}`));
  } catch (err) {
    logger.error(err);
    set(null);
  }
};

export const updateModel = (name: string) => async <T extends { uuid: string }>(
  set: Setter<T>,
  model: T
): Promise<void> => {
  try {
    set(await fetchJSON(`/${name}/${model.uuid}`, {
      method: 'PUT',
      body: JSON.stringify(model)
    }));
  } catch (err) {
    set(null);
    logger.error(err);
    // TODO dispatch error atom here
  }
};
