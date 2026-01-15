import apiFetch from "./apiClient";

export const fetchBarBeers = (bar_id) =>
  apiFetch(`/barBiere/${bar_id}/bieres`);

export const addBeerToBar = (bar_id, biere_id) =>
  apiFetch(`/barBiere/${bar_id}/bieres/${biere_id}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateBeerForBar = (bar_id, biere_id, data) =>
  apiFetch(`/barBiere/${bar_id}/bieres/${biere_id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deactivateBeerFromBar = (bar_id, biere_id) =>
  apiFetch(`/barBiere/${bar_id}/bieres/${biere_id}`, {
    method: "DELETE",
  });

export const restoreBeerForBar = (bar_id, biere_id) =>
  apiFetch(`/barBiere/${bar_id}/bieres/${biere_id}`, {
    method: "PATCH",
  });
