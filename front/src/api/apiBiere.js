import apiFetch from "./apiClient";

export const fetchBeers = () => apiFetch("/bieres");

export const fetchBeer = (id) => apiFetch(`/bieres/${id}`);

export const addBeer = (biere) =>
    apiFetch("/bieres", {
        method: "POST",
        body: JSON.stringify(biere),
    });

export const updateBeer = (id, biere) =>
    apiFetch(`/bieres/${id}`, {
        method: "PUT",
        body: JSON.stringify(biere),
    });

export const deactivateBeer = (id) =>
    apiFetch(`/bieres/${id}`, {
        method: "DELETE",
    });

export const enableBeer = (id) =>
    apiFetch(`/bieres/${id}`, {
        method: "PATCH",
    });