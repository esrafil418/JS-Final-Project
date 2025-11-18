import { El } from "../utils/el";
import { getBrands } from "../api/products";

export function BrandScroller() {
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

  function renderChips() {
    chipsWrap.innerHTML = "";
    const makeChip = (label) =>
      El({
        element: "button",
        innerText: label,
        className:
          `inline-block px-3 py-1 rounded-full text-sm transition-all select-none ` +
          (label === selected
            ? "bg-black text-white shadow-sm"
            : "bg-white border border-gray-200 text-gray-700 hover:scale-105"),
        eventListener: [
          {
            event: "click",
            callback: () => {
              if (selected === label) return;
              selected = label;
              renderChips();
              const brand = label === "All" ? "" : label;
              window.dispatchEvent(
                new CustomEvent("brandChange", { detail: { brand } })
              );
            },
          },
        ],
      });

    chipsWrap.appendChild(
      El({
        element: "div",
        className: "inline-flex gap-3",
        children: [makeChip("All")],
      })
    );

    for (const b of brands) {
      chipsWrap.appendChild(makeChip(b));
    }
  }

  async function load() {
    chipsWrap.innerHTML = "";
    for (let i = 0; i < 6; i++) {
      chipsWrap.appendChild(
        El({
          element: "div",
          className: "w-16 h-8 bg-gray-200 rounded-full animate-pulse",
        })
      );
    }

    try {
      const res = await getBrands();
      if (Array.isArray(res)) {
        brands = res;
      } else if (res?.data && Array.isArray(res.data)) {
        brands = res.data;
      } else {
        brands = Array.isArray(res) ? res : [];
      }
      renderChips();
    } catch (err) {
      chipsWrap.innerHTML = "";
      chipsWrap.appendChild(
        El({
          element: "div",
          innerText: "Failed to load brands",
          className: "text-sm text-red-500",
        })
      );
      console.error("BrandScroller load error:", err);
    }
  }

  load();

  return container;
}
