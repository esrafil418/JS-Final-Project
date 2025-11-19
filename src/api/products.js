import { BASE_URL } from "../constants";
import { authHelper } from "../utils/auth";

export async function getProducts(page = 1, limit = 10, brand = "") {
  try {
    const token = authHelper.getToken();
    console.log("token:", token);

    const url = `${BASE_URL}/sneaker?page=${page}&limit=${limit}${
      brand ? `&brand=${brand}` : ""
    }`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    console.log("Status:", res.status);

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();
    console.log("Data :", data);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function getBrands() {
  try {
    const token = authHelper.getToken();
    console.log("token:", token);

    const res = await fetch(`${BASE_URL}/sneaker/brands`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch brands: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Brands:", error);
  }
}
