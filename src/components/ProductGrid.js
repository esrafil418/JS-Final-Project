import { El } from "../utils/el";
import { ProductCard } from "./ProductCard";
import { getProducts } from "../api/products";

export function ProductGrid({ initialPage = 1, limit = 10, search = "" } = {}) {
  let page = initialPage;
  let loading = false;
  let finished = false;
  const list = [];

  const grid = El({
    element: "div",
    id: "productGrid",
    clasName: "w-[23.75rem] mt-3 grid grid-cols-2 gap-4",
  });

  const sentinel = El({
    element: "div",
    id: "grid-sentinel",
    className: "w-full h-6",
  });

  function renderProducts() {
    grid.innerHTML = ""; // clear
    for (const p of list) {
      const card = ProductCard({ product: p });
      grid.appendChild(card);
    }
    grid.appendChild(sentinel);
  }

  async function loadNext() {
    if (loading || finished) return;
    loading = true;

    try {
      const res = await getProducts({ page, limit, search });
      let items = [];
      let meta = null;

      if (Array.isArray(res)) {
        items = res;
        if (items.length < limit) finished = true;
      } else if (res?.data) {
        items = res.data;
        meta = res.meta;
        if (meta && meta.totalPages && page >= meta.totalPages) finished = true;
      } else {
        items = res.items || [];
      }

      if (items.length === 0) {
        finished = true;
      } else {
        list.push(...items);
        page += 1;
      }
      renderProducts();
    } catch (err) {
      console.error("Failed to load products:", err);
      // optionally show an error UI element
    } finally {
      loading = false;
    }
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          loadNext();
        }
      }
    },
    { root: null, rootMargin: "200px", threshold: 0.1 }
  );
  setTimeout(() => {
    const sentinelEl = document.getElementById("grid-sentinel");
    if (sentinelEl) observer.observe(sentinelEl);
  }, 300);

  async function resetAndLoad({ newSearch = "" } = {}) {
    page = 1;
    list.length = 0;
    finished = false;
    if (newSearch !== undefined) search = newSearch;
    await loadNext();
  }

  // initial load
  loadNext();

  const wrapper = El({
    element: "div",
    className: "w-[428px] flex flex-col items-center",
    children: [grid],
  });

  wrapper.resetAndLoad = resetAndLoad;
  return wrapper;
}
