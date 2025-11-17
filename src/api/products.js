import { BASE_URL } from "../constants";

// helper: read token from localStorage or cookie
function readToken() {
  const fromLS = localStorage.getItem("token");
  if (fromLS) return fromLS;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function buildAuthHeaders() {
  const token = readToken();
  const headers = { Accept: "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

// safe JSON parse
async function safeJson(res) {
  try {
    return await res.json();
  } catch (e) {
    return null;
  }
}

export async function getProducts({
  page = 1,
  limit = 10,
  search = "",
  brands = "",
} = {}) {
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("limit", limit);
  if (search) params.set("search", search);
  if (brands) params.set("brands", brands);

  const url = `${BASE_URL}/sneaker?${params.toString()}`;
  const headers = buildAuthHeaders();

  const res = await fetch(url, { method: "GET", headers });

  // parse body safely
  const body = await safeJson(res);

  if (!res.ok) {
    // build a useful error object
    const message =
      (body && (body.message || body.error)) || `HTTP ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.body = body;
    throw err;
  }

  // return parsed body (backend returns { total, totalPages, page, perPage, data })
  return body;
}

export async function getProductById(id) {
  const headers = buildAuthHeaders();
  const res = await fetch(`${BASE_URL}/sneaker/item/${id}`, {
    method: "GET",
    headers,
  });
  const body = await safeJson(res);
  if (!res.ok) {
    const message =
      (body && (body.message || body.error)) || `HTTP ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

export async function getBrands() {
  const headers = buildAuthHeaders();
  const res = await fetch(`${BASE_URL}/sneaker/brands`, {
    method: "GET",
    headers,
  });
  const body = await safeJson(res);
  if (!res.ok) {
    const message =
      (body && (body.message || body.error)) || `HTTP ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}
