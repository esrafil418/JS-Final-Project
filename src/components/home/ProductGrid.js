import { El } from "../../utils/el";
import { ProductCard } from "../shared/ProductCard";
import { getProducts } from "../../api/products";

export function ProductGrid() {
  let products = [];
  let currentPage = 1;
  let isLoading = false;
  let hasMore = true;

  const gridContainer = El({
    element: "div",
    className: "grid grid-cols-2 gap-4 min-h-[200px]",
    children: [],
  });

  const container = El({
    element: "div",
    className: "p-4",
    children: [gridContainer],
  });

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

  async function loadProducts(reset = false) {
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
      const data = await getProducts();
      const newProducts = data?.data || [];

      products = reset ? newProducts : [...products, ...newProducts];
      hasMore = newProducts.length >= 10;

      renderProducts();
    } catch (error) {
      console.error("Load error:", error);
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

  function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 200 &&
      !isLoading &&
      hasMore
    ) {
      currentPage++;
      loadProducts(currentPage);
    }
  }

  function handleBrandChange(brand) {
    currentPage = 1;
    products = [];
    loadProducts(1, true);
  }

  function handleSearch(query) {
    if (!query) return renderProducts();

    const filtered = products.filter((product) =>
      product.name?.toLowerCase().includes(query.toLowerCase())
    );

    gridContainer.innerHTML = "";
    filtered.forEach((product) => {
      gridContainer.appendChild(ProductCard({ product }));
    });
  }

  // Event listeners
  window.addEventListener("brandChange", (e) =>
    handleBrandChange(e.detail.brand)
  );
  window.addEventListener("search", (e) => handleSearch(e.detail.query));
  window.addEventListener("scroll", handleScroll);

  loadProducts(1, true);

  return container;
}
