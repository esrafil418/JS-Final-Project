import { El } from "../../../utils/el";
import { router } from "../../../utils/router";

export function ProductCard({ product }) {
  const { id, name, price, imageURL } = product || {};

  if (!id) return null;

  return El({
    element: "div",
    className:
      "w-[11.375rem] h-[15.25rem] bg-white rounded-md overflow-hidden cursor-pointer hover:shadow-md transition-shadow",
    onclick: () => router.navigate(`/product/${id}`),
    children: [
      // Image
      El({
        element: "div",
        className:
          "w-full h-[11.375rem] bg-gray-100 flex items-center justify-center rounded-[1.5rem]",
        children: [
          El({
            element: "img",
            src: imageURL,
            alt: name,
            className: "w-full h-full object-cover",
          }),
        ],
      }),
      // Info
      El({
        element: "div",
        className: "p-2 space-y-1",
        children: [
          El({
            element: "div",
            innerText: name,
            className: "text-sm font-medium truncate",
          }),
          El({
            element: "div",
            innerText: `$${price}`,
            className: "text-xs text-gray-500",
          }),
        ],
      }),
    ],
  });
}
