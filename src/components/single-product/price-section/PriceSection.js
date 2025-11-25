import { El } from "../../../utils/el";
import { ICONS } from "../../../constants/icons";

export function PriceSection({ price, quantity, onAddToCart }) {
  const totalPrice = price * quantity;

  return El({
    element: "div",
    className: "flex justify-between items-center px-2 gap-4",
    children: [
      El({
        element: "div",
        className: "flex flex-col",
        children: [
          El({
            element: "span",
            className: "text-[0.8rem] text-gray-500",
            innerText: "Total Price",
          }),
          El({
            element: "span",
            className: "text-[1.5rem] font-semibold text-[#152536] mt-1",
            innerText: `$${totalPrice.toFixed(2)}`,
          }),
        ],
      }),

      El({
        element: "button",
        className:
          "flex items-center justify-center gap-2 flex-1 bg-black text-white py-4 rounded-full font-semibold text-base shadow-xl active:scale-95 transition-all duration-200",
        children: [
          El({
            element: "i",
            className: "text-xl flex items-center justify-center p-1",
            children: [
              El({
                element: "img",
                src: "/public/icons/add-to-cart.svg",
                className: "w-5 h-5",
              }),
            ],
          }),
          El({
            element: "span",
            className: "text-[1rem] px-2",
            innerText: "Add to Cart",
          }),
        ],
        eventListener: [{ event: "click", callback: onAddToCart }],
      }),
    ],
  });
}
