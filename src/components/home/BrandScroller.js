import { El } from "../../utils/el";
import { getBrands } from "../../api/products";

export function BrandScroller({ onBrandChange } = {}) {
  let brands = [];
  let selected = "ALL";

  const chipsWrap = El({
    element: "div",
    id: "brand-chips",
    className: "flex gap-3 items-center",
    children: [],
  });

  const container = El({
    element: "div",
    className:
      "w-[428px] px-4 overflow-x-auto overflow-y-hidden scrollbar-hide",
    children: [chipsWrap],
  });

  function createBrandChip(label) {
    const isSelected = label === selected;

    return El({
      element: "button",
      innerText: label,
      className: `inline-block px-3 py-1 rounded-full text-sm transition-all select-none whitespace-nowrap ${
        isSelected
          ? "bg-black text-white shadow-sm"
          : "bg-white border border-gray-200 text-gray-700 hover:scale-105 hover:border-gray-300"
      }`,
      eventListener: [
        {
          event: "click",
          callback: () => handleBrandSelect(label),
        },
      ],
    });
  }

  function handleBrandSelect(label) {
    if (selected === label) return;

    selected = label;
    renderChips();

    const brand = label === "ALL" ? "" : label;
    window.dispatchEvent(new CustomEvent("brandChange", { detail: { brand } }));
    onBrandChange?.(brand);
  }

  function renderChips() {
    chipsWrap.innerHTML = "";

    const chipsContainer = El({
      element: "div",
      className: "inline-flex gap-3",
      children: [createBrandChip("ALL")],
    });

    brands.forEach((brand) => {
      chipsContainer.appendChild(createBrandChip(brand));
    });

    chipsWrap.appendChild(chipsContainer);
  }

  function renderLoadingSkeleton() {
    chipsWrap.innerHTML = "";

    for (let i = 0; i < 6; i++) {
      chipsWrap.appendChild(
        El({
          element: "div",
          className: "w-16 h-8 bg-gray-200 rounded-full animate-pulse",
        })
      );
    }
  }

  function renderError(message = "Failed to load brands") {
    chipsWrap.innerHTML = "";
    chipsWrap.appendChild(
      El({
        element: "div",
        innerText: message,
        className: "text-sm text-red-500 text-center w-full",
      })
    );
  }

  async function loadBrands() {
    renderLoadingSkeleton();

    try {
      const res = await getBrands();

      if (Array.isArray(res)) {
        brands = res;
      } else if (res?.data && Array.isArray(res.data)) {
        brands = res.data;
      } else if (res?.brands && Array.isArray(res.brands)) {
        brands = res.brands;
      } else {
        brands = [];
      }

      if (brands.length === 0) {
        renderError("No brands available");
        return;
      }

      renderChips();
    } catch (err) {
      console.error("BrandScroller load error:", err);
      renderError("Failed to load brands");
    }
  }

  loadBrands();

  return container;
}
