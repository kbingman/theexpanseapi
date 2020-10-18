const API_ENDPOINT = 'http://[::1]:5000';

type Method = 'GET' | 'OPTION' | 'POST' | 'PUT' | 'DELETE';

export const fetchJSON = async (pathname: string, method: Method = 'GET') => {
  try {
    const response = await fetch(`${API_ENDPOINT}${pathname}`, {
      method
    });
    const json = await response.json();
    return json;
  // then(r => r.json());
  } catch(err) {
    console.error(err);
    throw(err);
  }
};
