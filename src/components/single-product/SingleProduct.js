import { El } from "../../utils/el";
import { router } from "../../utils/router";
import { addToCart } from "../../api/cart";
import { getProductById } from "../../api/products";
import {
  BackButton,
  ProductImage,
  ProductInfo,
  SizeSelector,
  ColorSelector,
  QuantityCounter,
  PriceSection,
} from "./index";

export function SingleProduct({ productId }) {
  // stateهای کامپوننت
  let product = null;
  let selectedSize = "";
  let selectedColor = "";
  let quantity = 1;
  let isLoading = true;
  let error = null;

  const container = El({
    element: "div",
    className: "min-h-screen bg-white pb-20",
    children: [
      // دکمه برگشت
      BackButton({ onClick: () => router.navigate("/home") }),

      // Loading state
      El({
        element: "div",
        id: "loading-state",
        className: "flex justify-center items-center h-64",
        children: [
          El({
            element: "div",
            className: "text-gray-500",
            innerText: "Loading product...",
          }),
        ],
      }),
    ],
  });

  // تابع برای لود محصول
  async function loadProduct() {
    try {
      console.log("🔄 Loading product with ID:", productId);
      isLoading = true;

      const productData = await getProductById(productId);
      product = productData;

      // مقدارهای پیش‌فرض
      selectedSize = getAvailableSizes(productData)[0] || "";
      selectedColor = getAvailableColors(productData)[0] || "";

      renderProduct();
    } catch (err) {
      console.error("Failed to load product:", err);
      error = err.message;
      renderError();
    } finally {
      isLoading = false;
    }
  }

  // helper functions
  function getAvailableSizes(product) {
    if (product.sizes) return product.sizes;
    if (product.sizesString) return product.sizesString.split("|");
    return ["40", "41", "42", "43", "44"];
  }

  function getAvailableColors(product) {
    if (product.colors) return product.colors;
    if (product.colorsString) return product.colorsString.split("|");
    return ["Black", "White"];
  }

  function renderProduct() {
    const loadingEl = document.getElementById("loading-state");
    if (loadingEl) loadingEl.remove();

    container.appendChild(
      ProductImage({
        imageURL: product.imageURL,
        alt: product.name,
        className: "mt-16",
      })
    );

    container.appendChild(
      El({
        element: "div",
        className: "px-4 mt-6 space-y-6",
        children: [
          ProductInfo({
            name: product.name,
            rating: 4.5,
            description:
              product.description || `${product.brand} - High quality sneakers`,
          }),

          El({
            element: "div",
            className: "grid grid-cols-2 gap-6",
            children: [
              SizeSelector({
                sizes: getAvailableSizes(product),
                selectedSize: selectedSize,
                onSizeSelect: (size) => {
                  selectedSize = size;
                  console.log("Selected size:", size);
                },
              }),

              ColorSelector({
                colors: getAvailableColors(product),
                selectedColor: selectedColor,
                onColorSelect: (color) => {
                  selectedColor = color;
                  console.log("Selected color:", color);
                },
              }),
            ],
          }),

          QuantityCounter({
            quantity: quantity,
            onQuantityChange: (newQuantity) => {
              quantity = Math.max(1, newQuantity);
              console.log("Quantity:", quantity);
            },
          }),

          El({
            element: "hr",
            className: "border-gray-200 my-4",
          }),

          PriceSection({
            price: product.price,
            quantity: quantity,
            onAddToCart: handleAddToCart,
          }),
        ],
      })
    );
  }

  function renderError() {
    const loadingEl = document.getElementById("loading-state");
    if (loadingEl) loadingEl.remove();

    container.appendChild(
      El({
        element: "div",
        className: "flex flex-col items-center justify-center h-64 px-4",
        children: [
          El({
            element: "div",
            className: "text-red-500 text-lg mb-2",
            innerText: "Failed to load product",
          }),
          El({
            element: "div",
            className: "text-gray-500 text-sm mb-4 text-center",
            innerText: error || "Product not found",
          }),
          El({
            element: "button",
            className: "bg-black text-white px-6 py-2 rounded-lg",
            innerText: "Try Again",
            eventListener: [
              {
                event: "click",
                callback: loadProduct,
              },
            ],
          }),
        ],
      })
    );
  }

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const cartData = {
        productId: product.id,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        price: product.price,
      };

      console.log("🛒 Adding to cart:", cartData);
      await addToCart(cartData);
      alert("✅ Product added to cart successfully!");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("❌ Failed to add product to cart");
    }
  };

  // لود محصول هنگام ایجاد کامپوننت
  loadProduct();

  return container;
}
