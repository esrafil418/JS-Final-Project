import { BASE_URL } from "../../constants";
import { API_ENDPOINTS } from "../../constants";
import { getAuthHeaders } from "../http/http";

//! Get paginated list of products with optional brand filtering
export async function getProducts(page = 1, limit = 100, brand = "") {
  try {
    const url = `${BASE_URL}${
      API_ENDPOINTS.PRODUCTS
    }?page=${page}&limit=${limit}${brand ? `&brand=${brand}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    console.log("Products API Response Status:", res.status);

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Products API Error:", error);
    throw error;
  }
}
