// const API_ENDPOINT = "http://[::1]:5000";
const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "http://[::1]:5000"
    : "http://localhost:5000";

// type Method = "GET" | "OPTION" | "POST" | "PUT" | "DELETE";

export const fetchJSON = async (
  pathname: string,
  options: RequestInit = {}
): Promise<any> => {
  try {
    const response = await fetch(`${API_ENDPOINT}${pathname}`, {
      ...options,
      method: options.method || "GET",
    });
    return response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
