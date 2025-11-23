import { El } from "../../utils/el";
import { addToCart } from "../../api/cart/cart";
import { getProductById } from "../../api";
import { BackButton } from "../base/buttons/BackButton";
import {
  ProductImage,
  ProductInfo,
  SizeSelector,
  ColorSelector,
  QuantityCounter,
  PriceSection,
} from "./index";
import { ROUTES } from "../../constants";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function SingleProduct({ sneakerId }) {
  const container = El({
    element: "div",
    className: "max-h-screen bg-white pb-20",
  });

  let state = {
    product: null,
    selectedSize: "",
    selectedColor: "",
    quantity: 1,
    isLoading: true,
    error: null,
  };

  function updateState(newState) {
    state = { ...state, ...newState };
    render();
  }

  // Load product data
  async function loadProduct() {
    try {
      updateState({ isLoading: true, error: null });
      const id = Number(sneakerId);
      if (isNaN(id) || id <= 0) throw new Error("Invalid product ID");

      const product = await getProductById(id);
      const sizes = getAvailableSizes(product);
      const colors = getAvailableColors(product);

      // Check localStorage for previously selected size/color (selection key)
      const localData =
        JSON.parse(localStorage.getItem(`cart_item_select_${id}`) || "null") ||
        {};

      updateState({
        product,
        selectedSize: localData.size || sizes[0] || "",
        selectedColor: localData.color || colors[0] || "",
        isLoading: false,
      });
    } catch (err) {
      updateState({ error: err.message, isLoading: false });
    }
  }

  function getAvailableSizes(product) {
    if (!product?.sizes) return [];
    return typeof product.sizes === "string"
      ? product.sizes.split("|")
      : product.sizes || [];
  }

  function getAvailableColors(product) {
    if (!product?.colors) return [];
    return typeof product.colors === "string"
      ? product.colors.split("|")
      : product.colors || [];
  }

  function render() {
    container.innerHTML = "";
    if (state.isLoading) return container.appendChild(renderLoading());
    if (state.error || !state.product)
      return container.appendChild(renderError());
    container.appendChild(renderProductContent());
  }

  function renderLoading() {
    return El({
      element: "div",
      className: "flex items-center justify-center h-64",
      innerText: "Loading product...",
    });
  }

  function renderError() {
    return El({
      element: "div",
      className: "flex flex-col items-center justify-center h-64 px-4",
      children: [
        El({
          element: "div",
          className: "text-red-500 text-lg mb-2",
          innerText: state.error || "Failed to load product",
        }),
        El({
          element: "button",
          className: "bg-black text-white px-6 py-2 rounded-lg",
          innerText: "Try Again",
          eventListener: [{ event: "click", callback: loadProduct }],
        }),
      ],
    });
  }

  function renderProductContent() {
    const content = El({ element: "div" });

    content.appendChild(
      ProductImage({
        imageURL: state.product.imageURL || "/images/placeholder-image.png",
        alt: state.product.name,
        className: "relative",
        children: [
          El({
            element: "div",
            className: "absolute top-4 left-4 z-10",
            children: [BackButton(ROUTES.HOME)],
          }),
        ],
      })
    );

    content.appendChild(
      El({
        element: "div",
        className: "px-4 mt-6 space-y-6",
        children: [
          ProductInfo({
            name: state.product.name,
            rating: state.product.rating || 4.5,
            description:
              state.product.description ||
              "Premium quality product with excellent features.",
          }),
          El({
            element: "div",
            className: "grid grid-cols-2 gap-6",
            children: [
              SizeSelector({
                sizes: getAvailableSizes(state.product),
                selectedSize: state.selectedSize,
                onSizeSelect: (size) => {
                  updateState({ selectedSize: size });
                  // Persist last selection (single object) separately from the cart entries array
                  const selKey = `cart_item_select_${state.product.id}`;
                  const prev =
                    JSON.parse(localStorage.getItem(selKey) || "null") || {};
                  localStorage.setItem(
                    selKey,
                    JSON.stringify({ ...prev, size })
                  );
                },
              }),
              ColorSelector({
                colors: getAvailableColors(state.product),
                selectedColor: state.selectedColor,
                onColorSelect: (color) => {
                  updateState({ selectedColor: color });
                  // Persist last selection (single object)
                  const selKey = `cart_item_select_${state.product.id}`;
                  const prev =
                    JSON.parse(localStorage.getItem(selKey) || "null") || {};
                  localStorage.setItem(
                    selKey,
                    JSON.stringify({ ...prev, color })
                  );
                },
              }),
            ],
          }),
          QuantityCounter({
            quantity: state.quantity,
            onQuantityChange: (q) => updateState({ quantity: Math.max(1, q) }),
          }),
          El({ element: "hr", className: "border-gray-200 my-4" }),
          PriceSection({
            price: state.product.price,
            quantity: state.quantity,
            onAddToCart: handleAddToCart,
          }),
        ],
      })
    );

    return content;
  }

  async function handleAddToCart() {
    if (!state.selectedSize)
      return showToast("Please select a size", "warning");
    if (!state.selectedColor)
      return showToast("Please select a color", "warning");

    try {
      const cartData = {
        sneakerId: state.product.id,
        quantity: state.quantity,
        size: state.selectedSize,
        color: state.selectedColor,
      };
      console.log("Adding to cart:", cartData);
      // Create a local line entry so different size/color selections create separate lines
      const productKey = `cart_item_${state.product.id}`;
      let existing = JSON.parse(localStorage.getItem(productKey) || "[]");
      // Normalize existing to an array (handle legacy single-object entries)
      if (!Array.isArray(existing)) {
        if (existing && typeof existing === "object") existing = [existing];
        else existing = [];
      }
      // If an entry with same size+color exists, increment its quantity; otherwise add new entry
      const matchIdx = existing.findIndex(
        (e) => e.size === state.selectedSize && e.color === state.selectedColor
      );
      let localId = null;
      if (matchIdx !== -1) {
        // increase existing entry quantity by the added amount
        existing[matchIdx].quantity =
          (existing[matchIdx].quantity || 0) + state.quantity;
        localId = existing[matchIdx].localId || `l_${Date.now()}`;
        existing[matchIdx].localId = localId;
      } else {
        localId = `l_${Date.now()}`;
        const localEntry = {
          localId,
          size: state.selectedSize,
          color: state.selectedColor,
          quantity: state.quantity,
        };
        existing.push(localEntry);
      }
      localStorage.setItem(productKey, JSON.stringify(existing));

      // Call backend to add to cart (backend may aggregate by sneakerId). We'll try to capture returned backend id to link later.
      // Send only the delta quantity to backend
      const delta = state.quantity;
      const res = await addToCart({ ...cartData, quantity: delta });

      // Attempt to extract backend cart item id from response and attach to local entry
      try {
        const backendId = res?.id ?? res?.data?.id ?? res?.data ?? null;
        if (backendId) {
          const updated = JSON.parse(localStorage.getItem(productKey) || "[]");
          const idx = updated.findIndex((e) => e.localId === localId);
          if (idx !== -1) {
            updated[idx].backendId = backendId;
            localStorage.setItem(productKey, JSON.stringify(updated));
          }
        }
      } catch (e) {
        // ignore
      }

      showToast("Product added to cart successfully!", "success");
    } catch (error) {
      console.error("Add to cart error:", error);
      showToast("Failed to add product to cart", "error");
    }
  }

  function showToast(message, type = "info") {
    const backgrounds = {
      success: "#4CAF50",
      error: "#f44336",
      warning: "#a19700",
      info: "#2196F3",
    };
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      style: { background: backgrounds[type] || "#2196F3" },
    }).showToast();
  }

  loadProduct();
  return container;
}
