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
import { ICONS } from "../../constants/icons";

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

      updateState({
        product,
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
        imageURL: state.product.imageURL || ICONS.EMPTY_IMAGE,
        alt: state.product.name,
        className: "relative",
        children: [
          El({
            element: "div",
            className: "absolute top-4 left-0 z-10",
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
                onSizeSelect: (size) => updateState({ selectedSize: size }),
              }),
              ColorSelector({
                colors: getAvailableColors(state.product),
                selectedColor: state.selectedColor,
                onColorSelect: (color) => updateState({ selectedColor: color }),
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
    if (!state.selectedSize) {
      return showToast("Please select a size first", "warning");
    }

    if (!state.selectedColor) {
      return showToast("Please select a color first", "warning");
    }

    try {
      const cartData = {
        sneakerId: state.product.id,
        quantity: state.quantity,
      };

      await addToCart(cartData);
      showToast("Successfully added to cart", "success");
    } catch (error) {
      console.error("Add to cart error:", error);
      showToast("Failed to add product to cart", "error");
    }
  }

  function showToast(message, type = "info") {
    const backgrounds = {
      success: "#4CAF50",
      error: "#f44336",
      warning: "#630b0b",
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
