// pages/home/home.js
import { El } from "../../utils/el";
import { HeaderBar } from "../../components/HeaderBar";
import { SearchBar } from "../../components/SearchBar";
import { ProductGrid } from "../../components/ProductGrid";
import { BrandScroller } from "../../components/BrandScroller";
import { BottomNav } from "../../components/BottomNav";

export function Home() {
  // create productGrid first so listeners can call its methods
  const productGrid = ProductGrid({ initialPage: 1, limit: 10 });

  // listen to debounced search events from SearchBar
  window.addEventListener("search", (e) => {
    const q = e?.detail?.q ?? "";
    if (productGrid && productGrid.resetAndLoad) {
      productGrid.resetAndLoad({ newSearch: q, brands: "" });
    }
  });

  // listen to brand change events from BrandScroller
  window.addEventListener("brandChange", (e) => {
    const brand = e?.detail?.brand ?? "";
    if (productGrid && productGrid.resetAndLoad) {
      productGrid.resetAndLoad({ newSearch: "", brands: brand });
    }
  });

  const container = El({
    element: "div",
    className: "w-[26.75rem] min-h-screen flex flex-col items-center",
    children: [
      // Header
      HeaderBar(),
      El({ element: "div", className: "h-[0.5rem]" }),

      // Search
      SearchBar({ placeholder: "Search" }),
      El({ element: "div", className: "h-[1rem]" }),

      // Most Popular header (title + see all)
      El({
        element: "div",
        className: "w-[23.75rem] flex items-center justify-between px-[1rem]",
        children: [
          El({
            element: "p",
            innerText: "Most Popular",
            className: "text-[1.25rem] font-[600]",
          }),
          El({
            element: "a",
            innerText: "See All",
            className: "text-[1rem] font-[600] cursor-pointer",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  // optional: navigate to a full list page or apply filter
                  // router.navigate('/products'); // uncomment if you have such route
                },
              },
            ],
          }),
        ],
      }),

      El({ element: "div", className: "h-[0.5rem]" }),

      // Brand scroller (exactly after "Most Popular" header)
      BrandScroller(),

      El({ element: "div", className: "h-[0.75rem]" }),

      // Products grid
      productGrid,

      // spacer so the fixed BottomNav doesn't overlap content
      El({ element: "div", className: "h-[5.625rem]" }),

      // Bottom navigation (the component itself is fixed to bottom)
      BottomNav(),
    ],
  });

  return container;
}
