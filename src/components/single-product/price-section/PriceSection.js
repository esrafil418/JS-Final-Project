import { El } from "../../../utils/el";

export function PriceSection({ price, quantity, onAddToCart }) {
  const totalPrice = price * quantity;

  return El({
    element: "div",
    className: "space-y-3",
    children: [
      El({
        element: "div",
        className: "flex justify-between items-baseline",
        children: [
          El({
            element: "span",
            className: "text-lg text-gray-600",
            innerText: "Total:",
          }),
          El({
            element: "div",
            className: "text-2xl font-bold",
            innerText: `$${totalPrice.toFixed(2)}`,
          }),
        ],
      }),

      El({
        element: "button",
        className:
          "w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 active:scale-95 transition-all duration-200 shadow-lg",
        innerText: "Add to Cart 🛒",
        eventListener: [{ event: "click", callback: onAddToCart }],
      }),
    ],
  });
}
