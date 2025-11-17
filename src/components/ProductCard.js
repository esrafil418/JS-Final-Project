import { El } from "../utils/el";
import { router } from "../utils/router";

export function ProductCard({ product }) {
  const { id, title, name, brand, price, image } = product || {};

  // show shorter title: single line ellipsis
  const titleText = title || name || "Untitled";

  const card = El({
    element: "div",
    className:
      "w-[11.375] h-[15.25] bg-white rounded-md overflow-hidden cursor-pointer",
    onclick: () => {
      router.navigate(`/sneaker/item/${id}`);
    },
    children: [
      // image box
      El({
        element: "div",
        className:
          "w-[11.375rem] h-[11.375rem] bg-gray-100 flex items-center justify-center",
        children: [
          El({
            element: "img",
            src: image,
            alt: titleText,
            className: "w-full h-full object-cover",
          }),
        ],
      }),
      // title
      El({
        element: "div",
        className: "px-2 pt-2",
        children: [
          El({
            element: "div",
            innerText: titleText,
            title: titleText,
            className: "text-sm font-[500] leading-5 truncate w-[9.875rem]",
          }),
          El({
            element: "div",
            innerText: brand ? String(brand) : "",
            className: "text-xs text-gray-500 mt-1",
          }),
          El({
            element: "div",
            innerText: price ? `${price}` : "",
            className: "text-xs text-gray-500 mt-1",
          }),
        ],
      }),
    ],
  });
  return card;
}
