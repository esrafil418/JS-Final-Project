import { BASE_URL } from "../constants";
import { authHelper } from "../utils/auth";

// Get paginated list of products with optional brand filtering
export async function getProducts(page = 1, limit = 10, brand = "") {
  try {
    const token = authHelper.getToken();

    // Build URL with query parameters
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

    console.log("📡 Products API Response Status:", res.status);

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Products API Error:", error);
    throw error;
  }
}

// Get single product by ID using specific endpoint
export async function getProductById(sneakerId) {
  try {
    if (!sneakerId) throw new Error("Invalid product ID");

    console.log("🔍 Fetching product with ID:", sneakerId);
    const token = authHelper.getToken();

    const response = await fetch(`${BASE_URL}/sneaker/item/${sneakerId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const product = await response.json();
    console.log("✅ Product fetched successfully:", product);
    return product;
  } catch (error) {
    console.error("❌ Get Product by ID Error:", error);
    throw error;
  }
}

// Get list of available brands
export async function getBrands() {
  try {
    const token = authHelper.getToken();

    const res = await fetch(`${BASE_URL}/sneaker/brands`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    console.log("📡 Brands API Response Status:", res.status);

    if (!res.ok) {
      throw new Error(`Failed to fetch brands: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Brands API Error:", error);
  }
}
