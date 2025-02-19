export const IDUS_API = "http://localhost:5173/api";

export interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const IdusApi = async (
  endpoint: string,
  options: RequestOptions = {}
) => {
  const url = `${IDUS_API}${endpoint}`;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
