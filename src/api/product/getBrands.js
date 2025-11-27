import { BASE_URL } from "../../constants";
import { getAuthHeaders } from "../http/http";
import { API_ENDPOINTS } from "../../constants";

//! Get list of available brands
export async function getBrands() {
  try {
    const res = await fetch(`${BASE_URL}${API_ENDPOINTS.BRANDS}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    console.log("Brands API Response Status:", res.status);

    if (!res.ok) {
      throw new Error(`Failed to fetch brands: ${res.status}`);
    }

    const data = await res.json();
    return data.brands || data;
  } catch (error) {
    console.error("Brands API Error:", error);
    throw error;
  }
}
