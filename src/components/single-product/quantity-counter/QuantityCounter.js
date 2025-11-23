import { El } from "../../../utils/el";

export function QuantityCounter({ quantity = 1, onQuantityChange }) {
  const validQuantity = Math.max(1, quantity);

  return El({
    element: "div",
    className: "flex items-center justify-between",
    children: [
      El({
        element: "span",
        className: "font-semibold text-lg",
        innerText: "Quantity",
      }),
      El({
        element: "div",
        className: "flex items-center border border-gray-300 rounded-lg",
        children: [
          El({
            element: "button",
            className:
              "px-4 py-2 text-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
            innerText: "-",
            disabled: validQuantity <= 1,
            eventListener: [
              {
                event: "click",
                callback: () => onQuantityChange(validQuantity - 1),
              },
            ],
          }),
          El({
            element: "span",
            className: "px-6 py-2 font-medium min-w-12 text-center",
            innerText: validQuantity,
          }),
          El({
            element: "button",
            className: "px-4 py-2 text-lg hover:bg-gray-100 transition-colors",
            innerText: "+",
            eventListener: [
              {
                event: "click",
                callback: () => onQuantityChange(validQuantity + 1),
              },
            ],
          }),
        ],
      }),
    ],
  });
}
