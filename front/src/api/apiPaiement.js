import apiFetch from "./apiClient";

export const fetchPaiements = () => apiFetch("/paiements");

export const fetchPaiement = (id) => apiFetch(`/paiements/${id}`);

export const addPaiement = (paiement) => 
    apiFetch("/paiements", {
        method: "POST",
        body: JSON.stringify(paiement),
    });

export const updatePaiement = (id, paiement) =>
    apiFetch(`/paiements/${id}`, {
        method: "PUT",
        body: JSON.stringify(paiement),
    });

export const deactivatePaiement = (id) =>
    apiFetch(`/paiements/${id}`, {
        method: "DELETE",
    });

export const enablePaiement = (id) =>
    apiFetch(`/paiements/${id}`, {
        method: "PATCH",
    });