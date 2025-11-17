import { BASE_URL } from "../constants";

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

  const res = await fetch(`${BASE_URL}/sneaker?${params.toString()}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw err;
  }
  const json = await res.json();
  return json;
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/sneaker/item/${id}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw err;
  }
  return res.json();
}

export async function getBrands() {
  const res = await fetch(`${BASE_URL}/sneaker/brands`);
}
