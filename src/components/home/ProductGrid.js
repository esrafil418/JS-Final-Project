import { El } from "../../utils/el";
import { ProductCard } from "../shared/ProductCard";
import { getProducts } from "../../api/products";

export function ProductGrid() {
  console.log("🔄 ProductGrid component initialized");

  // State variables for managing products and pagination
  let products = []; // Array to store loaded products
  let currentPage = 1; // Current page number for pagination
  let isLoading = false; // Flag to prevent multiple simultaneous requests
  let hasMore = true; // Flag to check if more products are available
  let currentQuery = ""; // Current search query
  let currentBrand = ""; // Currently selected brand filter

  // Create the main grid container for products
  const gridContainer = El({
    element: "div",
    className: "grid grid-cols-2 gap-4 min-h-[200px]",
  });

  // Create the main component container
  const container = El({
    element: "div",
    className: "p-4",
    children: [gridContainer],
  });

  // Main function to load products from API with pagination support
  async function loadProducts(page = 1, reset = false) {
    // Prevent multiple simultaneous requests
    if (isLoading) return;

    console.log(`📦 Loading page ${page}, reset: ${reset}`);
    isLoading = true;

    // Show loading skeleton when resetting (first load or brand change)
    if (reset) {
      gridContainer.innerHTML = "";
      for (let i = 0; i < 4; i++) {
        gridContainer.appendChild(
          El({
            element: "div",
            className: "w-full h-64 bg-gray-200 rounded-md animate-pulse",
          })
        );
      }
    }

    try {
      // Fetch products from API using the imported getProducts function
      const data = await getProducts(page);
      console.log("📥 API Response:", data);

      const newProducts = data?.data || [];

      // Update products array based on reset flag
      if (reset) {
        products = newProducts; // Replace all products
        gridContainer.innerHTML = ""; // Clear grid
      } else {
        products = [...products, ...newProducts]; // Append new products
      }

      // Check if there are more products to load
      hasMore = newProducts.length > 0;

      // Render the updated product list
      renderProducts();
    } catch (error) {
      console.error("❌ Error:", error);
      // Show error message
      gridContainer.innerHTML = "";
      gridContainer.appendChild(
        El({
          element: "div",
          className: "col-span-2 text-center py-8 text-red-500",
          innerText: "Failed to load products",
        })
      );
    } finally {
      isLoading = false; // Reset loading flag
    }
  }

  // Function to render products in the grid
  function renderProducts() {
    gridContainer.innerHTML = "";

    // Show empty state if no products available
    if (products.length === 0) {
      gridContainer.appendChild(
        El({
          element: "div",
          className: "col-span-2 text-center py-8 text-gray-500",
          innerText: "No products found",
        })
      );
      return;
    }

    // Render each product using ProductCard component
    products.forEach((product) => {
      gridContainer.appendChild(ProductCard({ product }));
    });
  }

  // Handle scroll event for infinite scrolling
  function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Load more products when user is near bottom of page
    if (
      scrollTop + clientHeight >= scrollHeight - 500 &&
      !isLoading &&
      hasMore
    ) {
      currentPage++;
      loadProducts(currentPage);
    }
  }

  // Handle brand filter change
  function handleBrandChange(brand) {
    currentPage = 1; // Reset to first page
    currentBrand = brand; // Update current brand
    currentQuery = ""; // Clear any search query
    loadProducts(1, true); // Load products with reset
  }

  // Handle search functionality
  function handleSearch(query) {
    currentQuery = query;

    // If query is empty, show all products
    if (!query) {
      renderProducts();
      return;
    }

    // Filter products based on search query
    const filtered = products.filter((product) =>
      product.name?.toLowerCase().includes(query.toLowerCase())
    );

    gridContainer.innerHTML = "";

    // Show message if no products match the search
    if (filtered.length === 0) {
      gridContainer.appendChild(
        El({
          element: "div",
          className: "col-span-2 text-center py-8 text-gray-500",
          innerText: "No products found for your search",
        })
      );
      return;
    }

    // Render filtered products
    filtered.forEach((product) => {
      gridContainer.appendChild(ProductCard({ product }));
    });
  }

  // Event listeners for inter-component communication
  window.addEventListener("brandChange", (e) =>
    handleBrandChange(e.detail.brand)
  );
  window.addEventListener("search", (e) => handleSearch(e.detail.query));
  window.addEventListener("scroll", handleScroll);

  // Initial load of products
  loadProducts(1, true);

  return container;
}
