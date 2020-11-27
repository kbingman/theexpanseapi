import { logger } from "./logger";

const API_ENDPOINT =
  process.env.NODE_ENV === 'test'
    ? 'http://localhost:5000'
    : 'http://[::1]:5000';

/**
 * @param {pathname}
 * @param {options}
 *
 * @returns Promise<Type>
 */
export const fetchJSON = async <T>(
  pathname: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const method = options.method || 'GET';
    const resource = pathname.split('/')[1];
    logger.time(`${method} ${resource}`)
    const response = await fetch(`${API_ENDPOINT}${pathname}`, {
      ...options,
      method,
    });
    logger.timeEnd(`${method} ${resource}`)
    return response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
