import { BASE_URL, ROUTES } from "../../constants";
import { getAuthHeaders } from "../http/http";

//! Get user's cart items
export async function getCart() {
  try {
    const res = await fetch(`${BASE_URL}${ROUTES.CART}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Cart API error:", error);
    throw error;
  }
}

//! Add product to cart
export async function addToCart(productData) {
  try {
    const res = await fetch(`${BASE_URL}${ROUTES.CART}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });

    if (!res.ok) throw new Error(`Failed to add to cart: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Add to cart error:", error);
    throw error;
  }
}

//! Update cart item quantity or details
export async function updateCartItem(itemId, updateData) {
  try {
    const res = await fetch(`${BASE_URL}${ROUTES.CART}/${itemId}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData),
    });

    if (!res.ok) throw new Error(`Failed to update cart: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Update cart error:", error);
    throw error;
  }
}

//! Remove item from cart
export async function removeFromCart(itemId) {
  const res = await fetch(`${BASE_URL}${ROUTES.CART}/${itemId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Failed to remove from cart: ${res.status}`);
  }

  try {
    return await res.json();
  } catch {
    return {};
  }
}
