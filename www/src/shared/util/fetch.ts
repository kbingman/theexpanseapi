// const API_ENDPOINT = "http://[::1]:5000";
const API_ENDPOINT =
  process.env.NODE_ENV === 'test'
    ? 'http://localhost:5000'
    : 'http://[::1]:5000';

// type Method = "GET" | "OPTION" | "POST" | "PUT" | "DELETE";

/**
 * @param {pathname}
 * @param {options}
 *
 * @returns Promise<>
 */
export const fetchJSON = async <T>(
  pathname: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(`${API_ENDPOINT}${pathname}`, {
      ...options,
      method: options.method || 'GET',
    });
    return response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
