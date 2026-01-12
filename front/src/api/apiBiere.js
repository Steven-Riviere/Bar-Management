import apiFetch from "./apiClient";

export const fetchBieres = () => apiFetch("/bieres");

export const fetchBiere = (id) => apiFetch(`/bieres/${id}`);

export const addBiere = (biere) =>
    apiFetch("/bieres", {
    method: "POST",
    body: JSON.stringify(biere),
});

export const updateBiere = (id, biere) =>
apiFetch(`/bieres/${id}`, {
    method: "PUT",
    body: JSON.stringify(biere),
});

export const deactivateBiere = (id) =>
apiFetch(`/bieres/${id}`, {
    method: "DELETE",
});

export const enableBiere = (id) =>
apiFetch(`/bieres/${id}`, {
    method: "PATCH",
});