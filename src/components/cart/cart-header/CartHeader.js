import { ICONS } from "../../../constants/icons";
import { El } from "../../../utils/el";

export function CartHeader() {
  return El({
    element: "div",
    className: "flex justify-between items-center p-4",
    children: [
      El({
        element: "div",
        className: "flex items-center",
        children: [
          El({
            element: "img",
            className: "w-5 h-5 object-contain mr-2",
            src: ICONS.LOGO,
            alt: "Logo",
          }),
          El({
            element: "h1",
            className: "text-xl font-bold",
            innerText: "My Cart",
          }),
        ],
      }),

      El({
        element: "img",
        src: ICONS.SEARCH,
        className: "w-6 h-6",
      }),
    ],
  });
}
