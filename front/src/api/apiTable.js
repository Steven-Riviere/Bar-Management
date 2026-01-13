import apiFetch from "./apiClient";

export const fetchTables = () => apiFetch("/tables");

export const fetchTable = (id) => apiFetch(`/tables/${id}`);

export const addTables = (table) =>
    apiFetch("/tables", {
        method: "POST",
        body: JSON.stringify(table),
    });

export const updateTable = (id, table) =>
    apiFetch(`/tables/${id}`, {
        method: "PUT",
        body: JSON.stringify(table),
    });

export const deactivateTable = (id) =>
    apiFetch(`/tables/${id}`, {
        method: "DELETE",
    });

export const enableTable = (id) =>
    apiFetch(`/tables/${id}`, {
        method: "PATCH",
    });
