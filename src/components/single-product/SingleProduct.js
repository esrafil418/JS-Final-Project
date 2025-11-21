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

export function SingleProduct({ sneakerId }) {
  console.log("🎯 SingleProduct component started with sneakerId:", sneakerId);

  // State management for component
  let product = null;
  let selectedSize = "";
  let selectedColor = "";
  let quantity = 1;
  let isLoading = true;
  let error = null;

  // Create main container
  const container = El({
    element: "div",
    className: "min-h-screen bg-white pb-20",
    children: [
      // Back button
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

  // Function to load product data from API
  async function loadProduct() {
    try {
      console.log("🔄 Loading product with ID:", sneakerId);

      // Validate sneakerId
      if (!sneakerId || sneakerId === "undefined" || sneakerId === "null") {
        throw new Error(`Invalid product ID: ${sneakerId}`);
      }

      isLoading = true;
      const productData = await getProductById(sneakerId);
      product = productData;

      console.log("✅ Product data received:", product);

      // Set default selections
      const availableSizes = getAvailableSizes(productData);
      const availableColors = getAvailableColors(productData);

      selectedSize = availableSizes[0] || "";
      selectedColor = availableColors[0] || "";

      console.log(
        "🎯 Default size:",
        selectedSize,
        "Default color:",
        selectedColor
      );

      renderProduct();
    } catch (err) {
      console.error("❌ Failed to load product:", err);
      error = err.message;
      renderError();
    } finally {
      isLoading = false;
    }
  }

  // Helper function to extract available sizes from product data
  function getAvailableSizes(product) {
    let sizes = [];
    // Check multiple possible field names
    if (product.sizes && Array.isArray(product.sizes)) {
      sizes = product.sizes.map((s) => String(s).trim());
    } else if (product.sizesString) {
      sizes = product.sizesString.split("|").map((s) => s.trim());
    } else if (product.size) {
      sizes = Array.isArray(product.size)
        ? product.size.map((s) => String(s).trim())
        : [String(product.size).trim()];
    } else if (product.available_sizes) {
      sizes = Array.isArray(product.available_sizes)
        ? product.available_sizes.map((s) => String(s).trim())
        : [];
    }
    return sizes.length > 0 ? sizes : ["40", "41", "42", "43", "44"]; // Fallback sizes
  }

  // Helper function to extract available colors from product data
  function getAvailableColors(product) {
    let colors = [];
    // Check multiple possible field names
    if (product.colors && Array.isArray(product.colors)) {
      colors = product.colors.map((c) => String(c).trim());
    } else if (product.colorsString) {
      colors = product.colorsString.split("|").map((c) => c.trim());
    } else if (product.color) {
      colors = Array.isArray(product.color)
        ? product.color.map((c) => String(c).trim())
        : [String(product.color).trim()];
    } else if (product.available_colors) {
      colors = Array.isArray(product.available_colors)
        ? product.available_colors.map((c) => String(c).trim())
        : [];
    }
    return colors.length > 0 ? colors : ["Black", "White"]; // Fallback colors
  }

  // Function to render product UI
  function renderProduct() {
    const loadingEl = document.getElementById("loading-state");
    if (loadingEl) loadingEl.remove();

    // Add product image
    container.appendChild(
      ProductImage({
        imageURL: product.imageURL || product.image || "/placeholder-image.jpg",
        alt: product.name,
        className: "mt-16",
      })
    );

    // Add product details section
    container.appendChild(
      El({
        element: "div",
        className: "px-4 mt-6 space-y-6",
        children: [
          // Product basic info (name, rating, description)
          ProductInfo({
            name: product.name,
            rating: product.rating || 4.5,
            description:
              product.description ||
              `${product.brand || "Brand"} - High quality sneakers` ||
              "Premium quality product with excellent features.",
          }),

          // Size and color selectors in grid layout
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

          // Quantity selector
          QuantityCounter({
            quantity: quantity,
            onQuantityChange: (newQuantity) => {
              quantity = Math.max(1, newQuantity);
              console.log("Quantity:", quantity);
            },
          }),

          // Separator line
          El({
            element: "hr",
            className: "border-gray-200 my-4",
          }),

          // Price and add to cart section
          PriceSection({
            price: product.price || product.Price || 0,
            quantity: quantity,
            onAddToCart: handleAddToCart,
          }),
        ],
      })
    );
  }

  // Function to render error state
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

  // Function to handle add to cart action
  const handleAddToCart = async () => {
    if (!product) {
      alert("❌ Product data is not available");
      return;
    }

    try {
      const cartData = {
        sneakerId: product.id || product.pid || sneakerId,
        quantity: quantity,
      };

      console.log("🛒 Adding to cart:", cartData);
      await addToCart(cartData);
      alert("✅ Product added to cart successfully!");
    } catch (error) {
      console.error("❌ Add to cart error:", error);
      alert("❌ Failed to add product to cart");
    }
  };

  // Load product when component is created
  loadProduct();

  return container;
}
