const API_BASE_URL = "http://localhost:3000";

async function apiFetch(endpoint, options = {}) {
  try {  
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

   if (response.status === 204) return null;

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw {
        status: response.status,
        ...(data || {}),
      };
    }

    return data;
  } catch (err) {
    console.error("API ERROR:", err);
    throw err;
  }
}

export default apiFetch;
