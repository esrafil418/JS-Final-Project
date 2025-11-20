import { BASE_URL } from "../constants";
import { authHelper } from "../utils/auth";

// Get user's cart items
export async function getCart() {
  try {
    const token = authHelper.getToken();
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });

    if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Cart API error:", error);
    throw error;
  }
}

// Add product to cart
export async function addToCart(productData) {
  try {
    const token = authHelper.getToken();
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!res.ok) throw new Error(`Failed to add to cart: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Add to cart error:", error);
    throw error;
  }
}

// Update cart item quantity or details
export async function updateCartItem(itemId, updateData) {
  try {
    const token = authHelper.getToken();
    const res = await fetch(`${BASE_URL}/cart/${itemId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) throw new Error(`Failed to update cart: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Update cart error:", error);
    throw error;
  }
}

// Remove item from cart
export async function removeFromCart(itemId) {
  try {
    const token = authHelper.getToken();
    const res = await fetch(`${BASE_URL}/cart/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });

    if (!res.ok) throw new Error(`Failed to remove from cart: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Remove from cart error:", error);
    throw error;
  }
}
