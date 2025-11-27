import { El } from "../../utils/el";
import { CartHeader } from "./cart-header/CartHeader";
import { CartList } from "./cart-list/CartList";
import { CartSummary } from "./cart-summary/CartSummary";
import { RemoveModal } from "./remove-modal/RemoveModal";
import { BottomNav } from "../shared/botton-navbar";

import { getCart, removeFromCart, updateCartItem } from "../../api/cart/cart";

export function Cart() {
  let cartItems = [];
  let totalPrice = 0;
  let showRemoveModal = false;
  let itemToRemove = null;

  const container = El({
    element: "div",
    className: "min-h-screen bg-gray-50 pb-20",
    children: [
      CartHeader(),
      El({
        element: "div",
        id: "cart-content",
        children: [
          El({
            element: "div",
            className: "flex justify-center items-center h-40",
            children: [
              El({
                element: "div",
                className: "text-gray-500",
                innerText: "Loading cart...",
              }),
            ],
          }),
        ],
      }),
      BottomNav(),
    ],
  });

  const calculateTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function loadCart() {
    try {
      const backendCart = await getCart();

      let rawItems = [];
      if (Array.isArray(backendCart)) rawItems = backendCart;
      else if (Array.isArray(backendCart.items)) rawItems = backendCart.items;
      else if (Array.isArray(backendCart.cart)) rawItems = backendCart.cart;
      else if (backendCart.user?.cart) rawItems = backendCart.user.cart;

      cartItems = rawItems.map((raw) => {
        const product = raw.sneaker || raw.product || raw;
        return {
          id: raw.id || raw._id,
          name: product.name || "",
          imageURL: product.imageURL || "/images/placeholder-image.jpg",
          price: Number(raw.price || product.price || 0),
          quantity: raw.quantity || 1,
          size: raw.size || null,
          color: raw.color || null,
        };
      });

      totalPrice = calculateTotal();
      renderCart();
    } catch (err) {
      console.error("Failed to load cart:", err);
      renderError();
    }
  }

  function handleRemoveItem(index) {
    itemToRemove = cartItems[index];
    showRemoveModal = true;
    renderCart();
  }

  async function confirmRemove() {
    if (!itemToRemove) return;

    try {
      await removeFromCart(itemToRemove.id);

      cartItems = cartItems.filter((i) => i.id !== itemToRemove.id);
      totalPrice = calculateTotal();

      showRemoveModal = false;
      itemToRemove = null;

      const modal = document.getElementById("remove-modal");
      if (modal) modal.remove();

      renderCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  }

  function cancelRemove() {
    showRemoveModal = false;
    itemToRemove = null;
    renderCart();
  }

  async function handleUpdateQuantity(index, newQty) {
    if (newQty < 1) return;

    const item = cartItems[index];

    try {
      await updateCartItem(item.id, { quantity: newQty });
      cartItems[index].quantity = newQty;

      totalPrice = calculateTotal();
      renderCart();
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  }

  function renderCart() {
    const cartContent = document.getElementById("cart-content");
    if (!cartContent) return;

    cartContent.innerHTML = "";

    cartContent.appendChild(
      CartList({
        cartItems,
        onRemoveItem: handleRemoveItem,
        onUpdateQuantity: handleUpdateQuantity,
      })
    );

    const existingSummary = document.getElementById("cart-summary");
    if (existingSummary) existingSummary.remove();

    if (cartItems.length > 0) {
      container.appendChild(
        CartSummary({
          totalPrice,
          itemCount: cartItems.length,
        })
      );
    }

    if (showRemoveModal && itemToRemove) {
      const existing = document.getElementById("remove-modal");
      if (existing) existing.remove();

      document.body.appendChild(
        RemoveModal({
          item: itemToRemove,
          onConfirm: confirmRemove,
          onCancel: cancelRemove,
        })
      );
    }
  }

  function renderError() {
    const cartContent = document.getElementById("cart-content");
    if (!cartContent) return;

    cartContent.innerHTML = "";
    cartContent.appendChild(
      El({
        element: "div",
        className: "flex flex-col items-center justify-center h-40 p-4",
        children: [
          El({
            element: "div",
            className: "text-red-500 mb-2",
            innerText: "Failed to load cart",
          }),
          El({
            element: "button",
            className: "bg-black text-white px-4 py-2 rounded",
            innerText: "Try Again",
            eventListener: [{ event: "click", callback: loadCart }],
          }),
        ],
      })
    );
  }

  loadCart();
  return container;
}
