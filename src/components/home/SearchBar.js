import { El } from "../../utils/el";
import { debounce } from "../../utils/helpers";
import { ICONS } from "../../constants/icons";

/**
 * SearchBar Component - Creates a search input field with debounced search functionality
 * @param {Object} params - Configuration object
 * @param {string} params.placeholder - Placeholder text for the search input
 * @param {Function} params.onSearch - Optional callback function for search events
 * @returns {HTMLElement} The search bar element
 */
export function SearchBar({ placeholder = "Search", onSearch } = {}) {
  /**
   * Debounced search function to prevent excessive API calls/events
   * Fires after 500ms of user inactivity
   * @param {string} query - The search query string
   */
  const fireSearch = debounce((query) => {
    // Dispatch custom event for other components to listen to
    window.dispatchEvent(new CustomEvent("search", { detail: { query } }));

    // Call optional callback if provided
    onSearch?.(query);
  }, 500);

  // Create the main search bar container
  return El({
    element: "div",
    // Fixed width, height, and styling with light gray background
    className:
      "w-[23.75rem] h-[2.3125rem] flex items-center bg-[#fafafa] rounded-[0.25rem] mx-auto",
    children: [
      // Search icon on the left
      El({
        element: "img",
        src: ICONS.SEARCH, // Search icon from constants
        className: "w-[1.125rem] h-[1.125rem] mx-3",
      }),
      // Search input field
      El({
        element: "input",
        placeholder, // Dynamic placeholder text
        className: "bg-transparent w-full h-full outline-none text-sm",
        eventListener: [
          {
            event: "input",
            callback: (e) => {
              // Trim whitespace and trigger debounced search
              fireSearch(e.target.value.trim());
            },
          },
        ],
      }),
    ],
  });
}
