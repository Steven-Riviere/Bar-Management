const API_BASE_URL = "http://localhost:3000";

async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const err = new Error("Erreur API");
    err.status = response.status;
    throw err;
  }

  return response.json();
}

export default apiFetch;
