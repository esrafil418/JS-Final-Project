import { El } from "../../../utils/el";
import { ProductCard } from "../../shared/product-card/ProductCard";
import { getProducts } from "../../../api";

export function ProductGrid() {
  console.log("ProductGrid component initialized");

  let products = [];
  let currentPage = 1;
  let isLoading = false;
  let hasMore = true;
  let currentQuery = "";
  let currentBrand = "";

  const gridContainer = El({
    element: "div",
    className: "grid grid-cols-2 gap-4 min-h-[200px]",
  });

  const container = El({
    element: "div",
    className: "p-4",
    children: [gridContainer],
  });

  async function loadProducts(page = 1, reset = false) {
    if (isLoading) return;

    isLoading = true;

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
      const data = await getProducts(page, 10, currentBrand, currentQuery);
      console.log("API Response:", data);

      const newProducts = data?.data || [];

      if (reset) {
        products = newProducts;
        gridContainer.innerHTML = "";
      } else {
        products = [...products, ...newProducts];
      }

      hasMore = newProducts.length > 0;

      renderProducts();
    } catch (error) {
      console.error("Error:", error);
      gridContainer.innerHTML = "";
      gridContainer.appendChild(
        El({
          element: "div",
          className: "col-span-2 text-center py-8 text-red-500",
          innerText: "Failed to load products",
        })
      );
    } finally {
      isLoading = false;
    }
  }

  function renderProducts() {
    gridContainer.innerHTML = "";

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

  function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (
      scrollTop + clientHeight >= scrollHeight - 200 &&
      !isLoading &&
      hasMore
    ) {
      currentPage++;
      loadProducts(currentPage, false, currentBrand);
    }
  }

  function handleBrandChange(brand) {
    currentPage = 1;
    currentBrand = brand;
    currentQuery = "";
    loadProducts(1, true, currentBrand);
  }

  function handleSearch(query) {
    currentQuery = query;
    currentPage = 1;
    loadProducts(1, true);
  }

  window.addEventListener("brandChange", (e) =>
    handleBrandChange(e.detail.brand)
  );
  window.addEventListener("searchChange", (e) => handleSearch(e.detail.query));
  window.addEventListener("scroll", handleScroll);

  loadProducts(1, true, currentBrand);

  return container;
}
