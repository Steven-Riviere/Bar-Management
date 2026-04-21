import apiFetch from "./apiClient";

export const getGlobalIncome = () =>
  apiFetch("/analytics/income/global");

export const getIncomeByBar = () =>
  apiFetch("/analytics/income/by-bar");

export const getTopBeers = (limit = 5) =>
  apiFetch(`/analytics/beers/top`);

export const getSalesByPeriod = (start, end) =>
  apiFetch(`/analytics/sales/period`);

export const getStockUsage = () =>
  apiFetch("/analytics/stock/usage");