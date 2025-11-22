import { El } from "../../utils/el";
import { CartHeader } from "./CartHeader";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import { RemoveModal } from "./RemoveModal";
import { BottomNav } from "../shared/botton-navbar";
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

      let rawItems = [];
      if (Array.isArray(cartData)) {
        rawItems = cartData;
      } else if (Array.isArray(cartData.items)) {
        rawItems = cartData.items;
      } else if (Array.isArray(cartData.cart)) {
        rawItems = cartData.cart;
      } else if (cartData.user && Array.isArray(cartData.user.cart)) {
        rawItems = cartData.user.cart;
      } else if (Array.isArray(cartData.data)) {
        rawItems = cartData.data;
      } else {
        rawItems = [];
      }

      function mapCartItem(raw) {
        const sneaker = raw.sneaker || raw.product || raw.item || {};
        const price =
          (sneaker && (sneaker.price ?? sneaker.Price)) ?? raw.price ?? 0;
        const imageURL =
          sneaker.imageURL ||
          sneaker.image ||
          raw.imageURL ||
          raw.image ||
          "/images/placeholder-image.jpg";

        const size =
          raw.size ??
          raw.selectedSize ??
          raw.sizeSelected ??
          (typeof sneaker.sizes === "string"
            ? sneaker.sizes.split("|")[0]
            : Array.isArray(sneaker.sizes)
            ? sneaker.sizes[0]
            : "");
        const color =
          raw.color ??
          raw.selectedColor ??
          (typeof sneaker.colors === "string"
            ? sneaker.colors.split("|")[0]
            : Array.isArray(sneaker.colors)
            ? sneaker.colors[0]
            : "");

        return {
          id: raw.id ?? raw._id ?? sneaker.id,
          quantity: raw.quantity ?? raw.qty ?? 1,
          price: Number(price) || 0,
          name: sneaker.name || raw.name || "",
          imageURL,
          size,
          color,
        };
      }

      cartItems = rawItems.map(mapCartItem);
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

  async function confirmRemove(passedItem) {
    const target = passedItem || itemToRemove;
    if (!target) {
      console.error("No item to remove (itemToRemove is null)");
      showRemoveModal = false;
      itemToRemove = null;
      renderCart();
      return;
    }

    try {
      await removeFromCart(target.id);
      cartItems = cartItems.filter((item) => item.id !== target.id);
      totalPrice = calculateTotalPrice();
      showRemoveModal = false;
      itemToRemove = null;
      const existingModal = document.getElementById("remove-modal");
      if (existingModal) existingModal.remove();
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

    // Remove any existing cart summary to avoid duplicates
    const existingSummary = document.getElementById("cart-summary");
    if (existingSummary) existingSummary.remove();

    if (cartItems.length > 0) {
      // Append the cart summary to the container (it has id 'cart-summary')
      container.appendChild(
        CartSummary({
          totalPrice,
          itemCount: cartItems.length,
        })
      );
    }

    if (showRemoveModal && itemToRemove) {
      // remove any existing modal first
      const existing = document.getElementById("remove-modal");
      if (existing) existing.remove();

      document.body.appendChild(
        RemoveModal({
          item: itemToRemove,
          // pass the current item to the confirm handler to avoid closure/null issues
          onConfirm: () => confirmRemove(itemToRemove),
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
