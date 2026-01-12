import apiFetch from "./apiClient";

export const fetchBarBieres = (bar_id) =>
  apiFetch(`/barBiere/${bar_id}/bieres`);

export const addBiereToBar = (bar_id, biere_id) =>
  apiFetch(`/barBiere/${bar_id}/bieres/${biere_id}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateBiereForBar = (bar_id, biere_id, data) =>
  apiFetch(`/barBiere/${bar_id}/bieres/${biere_id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deactivateBiereFromBar = (bar_id, biere_id) =>
  apiFetch(`/barBiere/${bar_id}/bieres/${biere_id}`, {
    method: "DELETE",
  });

export const restoreBiereForBar = (bar_id, biere_id) =>
  apiFetch(`/barBiere/${bar_id}/bieres/${biere_id}`, {
    method: "PATCH",
  });
