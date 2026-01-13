import apiFetch from "./apiClient";

export const login = (credentials) =>
    apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    });

export const signup = (data) => 
    apiFetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
    });

    