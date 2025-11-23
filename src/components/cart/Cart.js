import { El } from "../../utils/el";
import { CartHeader } from "./cart-header/CartHeader";
import { CartList } from "./cart-list/CartList";
import { CartSummary } from "./cart-summary/CartSummary";
import { RemoveModal } from "./remove-modal/RemoveModal";
import { BottomNav } from "../shared/botton-navbar";
import { getCart, removeFromCart, updateCartItem } from "../../api/cart/cart";


function loadLocalEntries(productId) {
  const data = localStorage.getItem(`cart_item_${productId}`);
  return data ? JSON.parse(data) : [];
}

function saveLocalEntries(productId, entries) {
  localStorage.setItem(`cart_item_${productId}`, JSON.stringify(entries));
}

function addLocalEntry(productId, entry) {
  const entries = loadLocalEntries(productId);
  entries.push(entry);
  saveLocalEntries(productId, entries);
}

function updateLocalEntry(productId, localId, patch) {
  const entries = loadLocalEntries(productId);
  const idx = entries.findIndex((e) => e.localId === localId);
  if (idx === -1) return;
  entries[idx] = { ...entries[idx], ...patch };
  saveLocalEntries(productId, entries);
}

function removeLocalEntry(productId, localId) {
  const entries = loadLocalEntries(productId).filter(
    (e) => e.localId !== localId
  );
  saveLocalEntries(productId, entries);
}

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
      const backendCart = await getCart();

      let rawItems = [];
      if (Array.isArray(backendCart)) rawItems = backendCart;
      else if (Array.isArray(backendCart.items)) rawItems = backendCart.items;
      else if (Array.isArray(backendCart.cart)) rawItems = backendCart.cart;
      else if (backendCart.user && Array.isArray(backendCart.user.cart))
        rawItems = backendCart.user.cart;
      else rawItems = [];

      function mapCartItem(raw) {
        const sneaker = raw.sneaker || raw.product || {};

        // cartItemId is the backend cart record id (used for PATCH/DELETE)
        const cartItemId = raw.id ?? raw._id ?? null;
        // productId is the sneaker/product id used for local storage of selected size/color
        const productId = sneaker.id ?? sneaker.pid ?? null;

        const localEntries = productId ? loadLocalEntries(productId) : [];


        if (localEntries && localEntries.length > 0) {
          return localEntries.map((le) => ({
            id: cartItemId,
            productId,
            localId: le.localId,
            name: sneaker.name ?? raw.name ?? "",
            imageURL:
              sneaker.imageURL ??
              raw.imageURL ??
              "/images/placeholder-image.jpg",
            price: Number(raw.price ?? sneaker.price ?? 0),
            quantity: le.quantity ?? 1,
            size: le.size ?? null,
            color: le.color ?? null,
          }));
        }


        return [
          {
            id: cartItemId,
            productId,
            localId: null,
            name: sneaker.name ?? raw.name ?? "",
            imageURL:
              sneaker.imageURL ??
              raw.imageURL ??
              "/images/placeholder-image.jpg",
            price: Number(raw.price ?? sneaker.price ?? 0),
            quantity: raw.quantity ?? 1,
            size: raw.size ?? null,
            color: raw.color ?? null,
          },
        ];
      }

      cartItems = rawItems.flatMap(mapCartItem);
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
    if (!target) return;

    const backendId = target.id;
    const productId = target.productId;
    const localId = target.localId;
    const removedQty = target.quantity || 1;

    try {
      const allLines = cartItems.filter((i) => i.id === backendId);
      const backendTotal = allLines.reduce(
        (s, it) => s + (it.quantity || 0),
        0
      );
      const newBackendTotal = backendTotal - removedQty;

      if (backendId) {
        if (newBackendTotal > 0) {
          await updateCartItem(backendId, { quantity: newBackendTotal });
        } else {
          await removeFromCart(backendId);
        }
      }

      if (productId && localId) {
        removeLocalEntry(productId, localId);
      }

      cartItems = cartItems.filter(
        (i) => !(i.productId === productId && i.localId === localId)
      );

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
      const backendId = item.id;
      const productId = item.productId;
      const localId = item.localId;
      const oldQty = item.quantity || 0;


      const allLines = cartItems.filter((i) => i.id === backendId);
      const backendTotal = allLines.reduce(
        (s, it) => s + (it.quantity || 0),
        0
      );
      const newBackendTotal = backendTotal - oldQty + newQuantity;

      if (backendId) {
        await updateCartItem(backendId, { quantity: newBackendTotal });
      }

      if (productId && localId) {
        updateLocalEntry(productId, localId, { quantity: newQuantity });
      }

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
