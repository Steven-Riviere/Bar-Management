const API_BASE_URL = "http://localhost:3000";

async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if(!response.ok) {
    const errorData = await response.json().catch(() =>({}));

    if(response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = '/login';
    }
    throw new Error(errorData.error || "Erreur serveur");
  }

  return response.status === 204 ? null : response.json();

}

export default apiFetch;
