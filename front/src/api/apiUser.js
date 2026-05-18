import apiFetch from "./apiClient";

export const fetchUsers = () => apiFetch("/users");

export const fetchUser = (id) => apiFetch(`/users/${id}`);

export const updateUser = (id, user) =>
    apiFetch(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(user),
});

export const patchUser = (id, data) =>
  apiFetch(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });