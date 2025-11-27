import { BASE_URL } from "../../constants";
import { API_ENDPOINTS } from "../../constants";
import { getAuthHeaders } from "../http/http";

//! Get single product by ID using direct API endpoint
export async function getProductById(sneakerId) {
  try {
    console.log("Fetching product with ID:", sneakerId);

    if (!sneakerId) throw new Error("Invalid product ID");

    const res = await fetch(
      `${BASE_URL}${API_ENDPOINTS.PRODUCT_ITEM}/${sneakerId}`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );

    console.log("Single Product API Response Status:", res.status);

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    const data = await res.json();
    const product = data.data ?? data;

    if (!product) {
      throw new Error(`Product with ID ${sneakerId} not found`);
    }

    console.log("Product fetched successfully:", product);

    return product;
  } catch (error) {
    console.error("Get Product by ID Error:", error);
    throw error;
  }
}
