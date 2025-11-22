import { El } from "../../../utils/el";
import { debounce } from "../../../utils/helpers";
import { ICONS } from "../../../constants/icons";

export function SearchBar({ placeholder = "Search", onSearch } = {}) {
  const fireSearch = debounce((query) => {
    window.dispatchEvent(
      new CustomEvent("searchChange", { detail: { query } })
    );
    onSearch?.(query);
  }, 500);

  return El({
    element: "div",
    className:
      "w-[23.75rem] h-[2.3125rem] flex items-center bg-[#fafafa] rounded-[0.25rem] mx-auto",
    children: [
      El({
        element: "img",
        src: ICONS.SEARCH,
        className: "w-[1.125rem] h-[1.125rem] mx-3",
      }),
      El({
        element: "input",
        placeholder,
        className: "bg-transparent w-full h-full outline-none text-sm",
        eventListener: [
          {
            event: "input",
            callback: (e) => {
              const value = e.target.value.trim();
              fireSearch(value);
            },
          },
        ],
      }),
    ],
  });
}
