import apiFetch from "./apiClient";

export const fetchPayments = () => apiFetch("/paiements");

export const fetchPayment = (id) => apiFetch(`/paiements/${id}`);

export const addPayment = (paiement) => 
    apiFetch("/paiements", {
        method: "POST",
        body: JSON.stringify(paiement),
    });

export const updatePayment = (id, paiement) =>
    apiFetch(`/paiements/${id}`, {
        method: "PUT",
        body: JSON.stringify(paiement),
    });

export const deactivatePayment = (id) =>
    apiFetch(`/paiements/${id}`, {
        method: "DELETE",
    });

export const enablePayment = (id) =>
    apiFetch(`/paiements/${id}`, {
        method: "PATCH",
    });