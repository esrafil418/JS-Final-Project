import { El } from "../../utils/el";
import { addToCart } from "../../api/cart";
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
  console.log("SingleProduct component started with sneakerId:", sneakerId);

  const container = El({
    element: "div",
    className: "max-h-screen bg-white pb-20",
  });

  // State management with simple re-render
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

  async function loadProduct() {
    try {
      updateState({ isLoading: true, error: null });

      const id = Number(sneakerId);
      if (isNaN(id) || id <= 0) {
        throw new Error("Invalid product ID");
      }

      const product = await getProductById(id);
      const availableSizes = getAvailableSizes(product);
      const availableColors = getAvailableColors(product);

      updateState({
        product,
        selectedSize: availableSizes[0] || "",
        selectedColor: availableColors[0] || "",
        isLoading: false,
      });
    } catch (err) {
      updateState({ error: err.message, isLoading: false });
    }
  }

  function getAvailableSizes(product) {
    if (!product?.sizes) return [];
    if (typeof product.sizes === "string") {
      return product.sizes.split("|");
    }
    return product.sizes || [];
  }

  function getAvailableColors(product) {
    if (!product?.colors) return [];
    if (typeof product.colors === "string") {
      return product.colors.split("|");
    }
    return product.colors || [];
  }

  function render() {
    // Clear container
    container.innerHTML = "";

    if (state.isLoading) {
      container.appendChild(renderLoading());
      return;
    }

    if (state.error || !state.product) {
      container.appendChild(renderError());
      return;
    }

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

    // Product Image
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

    // Product Details
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
            onQuantityChange: (newQuantity) =>
              updateState({ quantity: Math.max(1, newQuantity) }),
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

  const handleAddToCart = async () => {
    if (!state.selectedSize) {
      showToast("Please select a size", "warning");
      return;
    }

    if (!state.selectedColor) {
      showToast("Please select a color", "warning");
      return;
    }

    try {
      const cartData = {
        sneakerId: state.product.id,
        quantity: state.quantity,
        size: state.selectedSize,
        color: state.selectedColor,
      };

      console.log("Adding to cart:", cartData);
      await addToCart(cartData);
      showToast("Product added to cart successfully!", "success");
    } catch (error) {
      console.error("Add to cart error:", error);
      showToast("Failed to add product to cart", "error");
    }
  };

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
      backgroundColor: backgrounds[type] || "#2196F3",
    }).showToast();
  }

  // Initial load
  loadProduct();

  return container;
}
