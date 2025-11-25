import { El } from "../../../utils/el";
import { ICONS } from "../../../constants/icons";

export function ProductInfo({ name }) {
  if (!name) {
    return El({
      element: "div",
      className: "text-red-500",
      innerText: "Product information not available",
    });
  }

  return El({
    element: "div",
    className: "space-y-4 mb-[0.7rem]",
    children: [
      El({
        element: "h1",
        className: "text-3xl font-bold truncate",
        innerText: name,
      }),
      El({
        element: "div",
        className: "flex items-center gap-2",
        children: [
          El({
            element: "div",
            className:
              "bg-[#ededee] rounded-md text-[0.6rem] px-2 py-[0.35rem] font-semibold",
            innerText: "5.371 sold",
          }),
          El({
            element: "img",
            src: ICONS.STAR,
            className: "w-[1.2rem]",
          }),
          El({
            element: "span",
            className: "text-gray-700 text-[0.8rem]",
            innerText: "4.3 (5.389 reviews)",
          }),
        ],
      }),
      El({
        element: "hr",
        className: "border-gray-200",
      }),
      El({
        element: "div",
        className: "text-[1rem] text-[#152536] font-semibold !mb-[0.4rem]",
        innerText: "Description",
      }),
      El({
        element: "p",
        className:
          "text-[0.8rem] text-gray-600 leading-relaxed line-clamp-2 cursor-pointer",
        innerText:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      }),
    ],
  });
}
