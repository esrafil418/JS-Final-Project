import { El } from "../../utils/el";
import { ProductCard } from "../shared/ProductCard"; 
import { getProducts } from "../../api/products";

export function ProductGrid() {
  let products = [];
  let currentPage = 1;
  let isLoading = false;
  let hasMore = true;
  let currentBrand = "";

  const gridContainer = El({
    element: "div",
    id: "products-grid",
    className: "grid grid-cols-2 gap-4 min-h-[200px]",
    children: [],
  });

  const loadingIndicator = El({
    element: "div",
    id: "loading-indicator",
    className: "hidden col-span-2 text-center py-4 text-gray-500",
    innerText: "Loading more products...",
  });

  const errorMessage = El({
    element: "div",
    id: "error-message",
    className: "hidden col-span-2 text-center py-4 text-red-500",
  });

  const container = El({
    element: "div",
    className: "p-4",
    children: [gridContainer, loadingIndicator, errorMessage],
  });

  function showLoading() {
    isLoading = true;
    loadingIndicator.classList.remove("hidden");
  }

  function hideLoading() {
    isLoading = false;
    loadingIndicator.classList.add("hidden");
  }

  function showError(message) {
    errorMessage.innerText = message;
    errorMessage.classList.remove("hidden");
  }

  function hideError() {
    errorMessage.classList.add("hidden");
  }

  function renderProducts() {
    gridContainer.innerHTML = "";
    hideError();

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

    products.forEach((product) => {
      gridContainer.appendChild(ProductCard({ product }));
    });
  }

  function renderLoadingSkeleton() {
    gridContainer.innerHTML = "";
    for (let i = 0; i < 6; i++) {
      gridContainer.appendChild(
        El({
          element: "div",
          className:
            "w-[11.375rem] h-[15.25rem] bg-gray-200 rounded-md animate-pulse",
        })
      );
    }
  }

  async function loadProducts(page = 1, brand = "", reset = false) {
    if (isLoading) return;

    showLoading();
    if (reset) renderLoadingSkeleton();

    try {
      const data = await getProducts(page, 10, brand);

      const newProducts = data?.data || data?.products || data || [];

      if (reset) {
        products = newProducts;
      } else {
        products = [...products, ...newProducts];
      }

      hasMore = newProducts.length === 10;

      renderProducts();
    } catch (error) {
      console.error("ProductGrid load error:", error);
      showError("Failed to load products. Please try again.");

      if (reset) {
        products = [];
        renderProducts();
      }
    } finally {
      hideLoading();
    }
  }

  function loadMoreProducts() {
    if (!isLoading && hasMore) {
      currentPage++;
      loadProducts(currentPage, currentBrand, false);
    }
  }

  function handleBrandChange(brand) {
    currentBrand = brand;
    currentPage = 1;
    products = [];
    loadProducts(1, brand, true);
  }

  function handleSearch(query) {
    console.log("Search query:", query);
    if (query) {
      const filtered = products.filter(
        (product) =>
          product.name?.toLowerCase().includes(query.toLowerCase()) ||
          product.brand?.toLowerCase().includes(query.toLowerCase())
      );

      if (filtered.length === 0) {
        gridContainer.innerHTML = "";
        gridContainer.appendChild(
          El({
            element: "div",
            className: "col-span-2 text-center py-8 text-gray-500",
            innerText: `No products found for "${query}"`,
          })
        );
      } else {
        gridContainer.innerHTML = "";
        filtered.forEach((product) => {
          gridContainer.appendChild(ProductCard({ product }));
        });
      }
    } else {
      renderProducts();
    }
  }

  // Infinite scroll
  function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 100 &&
      !isLoading &&
      hasMore
    ) {
      loadMoreProducts();
    }
  }

  // event listeners
  window.addEventListener("brandChange", (event) => {
    handleBrandChange(event.detail.brand);
  });

  window.addEventListener("search", (event) => {
    handleSearch(event.detail.query);
  });

  window.addEventListener("scroll", handleScroll);

  loadProducts(1, "", true);

  // Cleanup function
  container.cleanup = () => {
    window.removeEventListener("brandChange", handleBrandChange);
    window.removeEventListener("search", handleSearch);
    window.removeEventListener("scroll", handleScroll);
  };

  return container;
}
