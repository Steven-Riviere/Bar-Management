import apiFetch from "./apiClient";

export const fetchBars = () => apiFetch("/bars");

export const fetchBar = (id) => apiFetch(`/bars/${id}`);

export const addBar = (bar) =>
    apiFetch("/bars", {
        method: "POST",
        body: JSON.stringify(bar),
});

export const updateBar = (id, bar) =>
    apiFetch(`/bars/${id}`, {
        method: "PUT",
        body: JSON.stringify(bar),
});

export const patchBar = (id, data) =>
  apiFetch(`/bars/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

