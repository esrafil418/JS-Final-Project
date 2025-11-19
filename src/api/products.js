import { BASE_URL } from "../constants";
import { authHelper } from "../utils/auth";

export async function getProducts(page = 1, limit = 10, brand = "") {
  try {
    const token = authHelper.getToken();
    console.log("Using token:", token);

    const url = `${BASE_URL}/sneaker?page=${page}&limit=${limit}${
      brand ? `&brand=${brand}` : ""
    }`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log("Response status:", res.status);

    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Products API error:", error);
    throw error;
  }
}

export async function getBrands() {
  try {
    const token = authHelper.getToken();
    console.log("Using token for brands:", token);

    const res = await fetch(`${BASE_URL}/sneaker/brands`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log("Brands response status:", res.status);

    if (!res.ok) throw new Error(`Failed to fetch brands: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Brands API error:", error);
    return ["NIKE", "ADIDAS", "PUMA", "NEW BALANCE", "CONVERSE"];
  }
}
