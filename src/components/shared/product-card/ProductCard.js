import { ICONS } from "../../../constants/icons";
import { El } from "../../../utils/el";
import { router } from "../../../utils/router";

export function ProductCard({ product }) {
  const { id, name, price, imageURL } = product || {};

  if (!id) return null;

  return El({
    element: "div",
    className:
      "w-[11.375rem] h-[15.25rem] bg-white overflow-hidden cursor-pointer",
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
            src: imageURL || ICONS.EMPTY_IMAGE,
            alt: name,
            className: "w-full h-full object-cover rounded-[1.5rem]",
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
            className: "text-[1.25rem] text-[#152536] font-bold truncate",
          }),
          El({
            element: "div",
            innerText: `$ ${price}.00`,
            className: "text-[1rem] text-[#152536] font-semibold",
          }),
        ],
      }),
    ],
  });
}
