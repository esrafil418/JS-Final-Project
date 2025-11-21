import { El } from "../../utils/el";
import { getBrands } from "../../api";

export function BrandScroller({ onBrandChange } = {}) {
  // Array to store the list of available brands
  let brands = [];
  // Currently selected brand, defaults to "ALL"
  let selected = "ALL";

  // Create the wrapper element that will contain the brand chips
  const chipsWrap = El({
    element: "div",
    id: "brand-chips",
    className: "flex gap-3 items-center",
    children: [],
  });

  // Main container with fixed width and horizontal scrolling
  const container = El({
    element: "div",
    className:
      "w-[428px] px-4 overflow-x-auto overflow-y-hidden scrollbar-hide",
    children: [chipsWrap],
  });

  /**
   * Creates a brand chip (button) element
   * @param {string} label - The brand name to display on the chip
   * @returns {HTMLElement} The created chip element
   */
  function createBrandChip(label) {
    const isSelected = label === selected;

    return El({
      element: "button",
      innerText: label,
      // Apply different styles based on selection state
      className: `inline-block px-3 py-1 rounded-full text-sm transition-all select-none whitespace-nowrap ${
        isSelected
          ? "bg-black text-white shadow-sm" // Selected style
          : "bg-white border border-gray-200 text-gray-700 hover:scale-105 hover:border-gray-300" // Default style
      }`,
      eventListener: [
        {
          event: "click",
          callback: () => handleBrandSelect(label), // Handle click event
        },
      ],
    });
  }

  /**
   * Handles brand selection when a chip is clicked
   * @param {string} label - The selected brand label
   */
  function handleBrandSelect(label) {
    // Do nothing if the same brand is clicked again
    if (selected === label) return;

    // Update the selected brand
    selected = label;
    // Re-render the chips to reflect the new selection
    renderChips();

    // Convert "ALL" to empty string for filtering
    const brand = label === "ALL" ? "" : label;

    // Dispatch a custom event for other components to listen to
    window.dispatchEvent(new CustomEvent("brandChange", { detail: { brand } }));

    // Call the optional callback if provided
    onBrandChange?.(brand);
  }

  /**
   * Renders all brand chips based on the current brands array and selection state
   */
  function renderChips() {
    // Clear existing chips
    chipsWrap.innerHTML = "";

    // Create a container for all chips
    const chipsContainer = El({
      element: "div",
      className: "inline-flex gap-3",
      children: [createBrandChip("ALL")], // Always include "ALL" option
    });

    // Create and append chips for each brand
    brands.forEach((brand) => {
      chipsContainer.appendChild(createBrandChip(brand));
    });

    // Add the chips container to the wrapper
    chipsWrap.appendChild(chipsContainer);
  }

  /**
   * Displays a loading skeleton while brands are being fetched
   */
  function renderLoadingSkeleton() {
    chipsWrap.innerHTML = "";

    // Create 6 skeleton placeholder chips
    for (let i = 0; i < 6; i++) {
      chipsWrap.appendChild(
        El({
          element: "div",
          className: "w-16 h-8 bg-gray-200 rounded-full animate-pulse",
        })
      );
    }
  }

  /**
   * Displays an error message when brand loading fails
   * @param {string} message - The error message to display
   */
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

  /**
   * Fetches brands from API and handles the response
   */
  async function loadBrands() {
    // Show loading state
    renderLoadingSkeleton();

    try {
      // API call to get brands
      const res = await getBrands();

      // Handle different possible response structures
      if (Array.isArray(res)) {
        brands = res;
      } else if (res?.data && Array.isArray(res.data)) {
        brands = res.data;
      } else if (res?.brands && Array.isArray(res.brands)) {
        brands = res.brands;
      } else {
        brands = [];
      }

      // If no brands available, show error message
      if (brands.length === 0) {
        renderError("No brands available");
        return;
      }

      // Render the brand chips
      renderChips();
    } catch (err) {
      console.error("BrandScroller load error:", err);
      renderError("Failed to load brands");
    }
  }

  // Initialize the component by loading brands
  loadBrands();

  // Return the main container element
  return container;
}
