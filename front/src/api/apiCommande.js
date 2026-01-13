import apiFetch from "./apiClient";

// --- Commandes CRUD ---
export const fetchOrders = () => apiFetch("/commandes");

export const fetchOrder = (id) => apiFetch(`/commandes/${id}`);

export const addOrder = (data) =>
  apiFetch("/commandes", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateOrder = (id, data) =>
  apiFetch(`/commandes/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const removeOrder = (id) =>
  apiFetch(`/commandes/${id}`, {
    method: "DELETE",
  });

// --- Paiements d'une commande ---
export const addPayment = (commande_id, data) =>
  apiFetch(`/commandes/${commande_id}/paiements`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updatePayment = (commande_id, paiement_id, data) =>
  apiFetch(`/commandes/${commande_id}/paiements/${paiement_id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deletePayment = (commande_id, paiement_id) =>
  apiFetch(`/commandes/${commande_id}/paiements/${paiement_id}`, {
    method: "DELETE",
  });

// --- Bières d'une commande ---
export const addBeer = (commande_id, data) =>
  apiFetch(`/commandes/${commande_id}/bieres`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateBeer = (commande_id, biere_id, data) =>
  apiFetch(`/commandes/${commande_id}/bieres/${biere_id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteBeer = (commande_id, biere_id) =>
  apiFetch(`/commandes/${commande_id}/bieres/${biere_id}`, {
    method: "DELETE",
  });

// --- Clôture d'une commande ---
export const closeOrder = (commande_id) =>
  apiFetch(`/commandes/${commande_id}/cloturer`, {
    method: "PATCH",
  });
