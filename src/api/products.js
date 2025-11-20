import { BASE_URL } from "../constants";
import { authHelper } from "../utils/auth";

// دریافت لیست محصولات
export async function getProducts(page = 1, limit = 10, brand = "") {
  try {
    const token = authHelper.getToken();
    
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

// دریافت محصول خاص - از بین لیست پیدا می‌کنیم
export async function getProductById(productId) {
  try {
    console.log("🔍 Looking for product ID:", productId);
    
    // همه محصولات رو بگیریم
    const allProducts = await getProducts(1, 100);
    
    // محصول رو از بین لیست پیدا کنیم
    const product = allProducts.data.find(p => p.id == productId || p.pid == productId);
    
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    
    console.log("✅ Product found:", product);
    return product;

  } catch (error) {
    console.error("❌ Get Product by ID Error:", error);
    throw error;
  }
}

// دریافت برندها
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
    return ["NIKE", "ADIDAS", "PUMA", "NEW BALANCE", "CONVERSE"];
  }
}