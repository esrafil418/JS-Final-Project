import { El } from "../utils/el";

function debounce(fn, wait = 2000) {
  let t = null;
  return (...args) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export function SearchBar({ placeholder = "Search" } = {}) {
  const fireSearch = debounce((q) => {
    window.dispatchEvent(new CustomEvent("search", { details: { q } }));
  }, 2000);

  const input = El({
    element: "input",
    id: "searchInput",
    placeholder,
    className:
      "bg-[#fafafa] w-[23.75rem] h-[2.3125] pl-3 pr-3 rounded-[0.25rem] outline-none text-[0.875rem] font-[400]",
    eventListener: [
      {
        event: "input",
        callback: (e) => {
          const q = e.target.value;
          fireSearch(q);
        },
      },
    ],
  });

  const container = El({
    element: "div",
    className:
      "w-[23.75rem] h-[2.3125] flex items-center pl-2 pr-2 bg-[#fafafa] rounded-[0.25rem]",
    children: [
      El({
        element: "div",
        src: "/public/icons/search.gif",
        alt: "search",
        className: "w-[1.125rem] h-[1.125rem] opacity-60 p-[1px]",
      }),
      input,
    ],
  });
  return container;
}
