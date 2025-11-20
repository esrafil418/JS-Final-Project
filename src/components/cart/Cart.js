import { El } from "../../utils/el";
import { CartHeader } from "./CartHeader";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import { RemoveModal } from "./RemoveModal";
import { BottomNav } from "../layout/BottomNav";
import { getCart, removeFromCart, updateCartItem } from "../../api/cart";

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

  function calculateTotalPrice() {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  async function loadCart() {
    try {
      const cartData = await getCart();
      cartItems = cartData.items || [];
      totalPrice = calculateTotalPrice();
      renderCart();
    } catch (error) {
      console.error("Failed to load cart:", error);
      renderError();
    }
  }

  async function handleRemoveItem(index) {
    itemToRemove = cartItems[index];
    showRemoveModal = true;
    renderCart();
  }

  async function confirmRemove() {
    try {
      await removeFromCart(itemToRemove.id);
      cartItems = cartItems.filter((item) => item.id !== itemToRemove.id);
      totalPrice = calculateTotalPrice();
      showRemoveModal = false;
      itemToRemove = null;
      renderCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  }

  function cancelRemove() {
    showRemoveModal = false;
    itemToRemove = null;
    renderCart();
  }

  async function handleUpdateQuantity(index, newQuantity) {
    if (newQuantity < 1) return;

    try {
      const item = cartItems[index];
      await updateCartItem(item.id, { quantity: newQuantity });
      cartItems[index].quantity = newQuantity;
      totalPrice = calculateTotalPrice();
      renderCart();
    } catch (error) {
      console.error("Failed to update quantity:", error);
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

    if (cartItems.length > 0) {
      container.appendChild(
        CartSummary({
          totalPrice,
          itemCount: cartItems.length,
        })
      );
    }

    if (showRemoveModal && itemToRemove) {
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
