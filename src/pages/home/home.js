import { El } from "../../utils/el";
import { HeaderBar } from "../../components/HeaderBar";
import { SearchBar } from "../../components/SearchBar";

export function Home() {
  const productsWrapper = El({
    element: "div",
    id: "productsWrapper",
    className: "w-[26.75rem] mt-[1rem] px-[1rem] grid grid-cols-2 gap-[1rem]",
  });
  //   TODO add products here later

  window.addEventListener("search", (e) => {
    const q = e.detail.q;
    console.log(q);
    //   TODO call products later
  });

  const container = El({
    element: "div",
    className: "w-[26.75rem] min-h-screen flex flex-col items-center",
    children: [
      HeaderBar(),
      El({ element: "div", className: "h-[0.5rem]" }),
      SearchBar({ placeholder: "Search" }),
      El({ element: "div", className: "h-[1.875rem]" }),
      // Most Popular header
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
          }),
        ],
      }),
      El({
        element: "div",
        className: "w-[26.75] overflow-x-auto py-[0.5rem] px-[1rem]",
        children: [
          El({
            element: "div",
            className: "inline-block",
            // TODO creat scroller later
          }),
        ],
      }),
      productsWrapper,
      El({ element: "div", className: "h-[5.625rem]" }),
    ],
  });
  return container;
}
