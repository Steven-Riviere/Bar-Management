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

    if (response.status === 401) {
      return null;
    }

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Erreur API");
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();

    } catch (err) {
    console.error("API ERROR:", err);
    throw err;
  }
}

export default apiFetch;
