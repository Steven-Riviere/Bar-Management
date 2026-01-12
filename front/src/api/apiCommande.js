import apiFetch from "./apiClient";

// --- Commandes CRUD ---
export const fetchCommandes = () => apiFetch("/commandes");

export const fetchCommande = (id) => apiFetch(`/commandes/${id}`);

export const addCommande = (data) =>
  apiFetch("/commandes", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateCommande = (id, data) =>
  apiFetch(`/commandes/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const removeCommande = (id) =>
  apiFetch(`/commandes/${id}`, {
    method: "DELETE",
  });

// --- Paiements d'une commande ---
export const addPaiement = (commande_id, data) =>
  apiFetch(`/commandes/${commande_id}/paiements`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const modifyPaiement = (commande_id, paiement_id, data) =>
  apiFetch(`/commandes/${commande_id}/paiements/${paiement_id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deletePaiement = (commande_id, paiement_id) =>
  apiFetch(`/commandes/${commande_id}/paiements/${paiement_id}`, {
    method: "DELETE",
  });

// --- Bières d'une commande ---
export const addBiere = (commande_id, data) =>
  apiFetch(`/commandes/${commande_id}/bieres`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const modifyBiere = (commande_id, biere_id, data) =>
  apiFetch(`/commandes/${commande_id}/bieres/${biere_id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteBiere = (commande_id, biere_id) =>
  apiFetch(`/commandes/${commande_id}/bieres/${biere_id}`, {
    method: "DELETE",
  });

// --- Clôture d'une commande ---
export const cloturerCommande = (commande_id) =>
  apiFetch(`/commandes/${commande_id}/cloturer`, {
    method: "PATCH",
  });
