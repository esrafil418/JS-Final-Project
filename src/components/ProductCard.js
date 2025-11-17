import { El } from "../utils/el";
import { router } from "../utils/router";

export function ProductCard({ product }) {
  const { id, title, name, brand, price, imageURL } = product || {};

  const card = El({
    element: "div",
    className:
      "w-[11.375rem] h-[15.25rem] bg-white rounded-md overflow-hidden cursor-pointer",
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
            src: imageURL,
            alt: name,
            loading: "lazy",
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
            innerText: name,
            title: name,
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
