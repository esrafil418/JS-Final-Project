import { El } from "../../utils/el";

/**
 * Quantity selector with increment/decrement buttons
 */
export function QuantityCounter({ quantity, onQuantityChange }) {
  return El({
    element: "div",
    className: "flex items-center justify-between",
    children: [
      // Label
      El({
        element: "span",
        className: "font-semibold text-lg",
        innerText: "Quantity",
      }),
      // Counter controls
      El({
        element: "div",
        className: "flex items-center border border-gray-300 rounded-lg",
        children: [
          // Decrease button
          El({
            element: "button",
            className: "px-4 py-2 text-lg disabled:opacity-50",
            innerText: "-",
            disabled: quantity <= 1, // Prevent going below 1
            eventListener: [
              {
                event: "click",
                callback: () => onQuantityChange(quantity - 1),
              },
            ],
          }),
          // Current quantity display
          El({
            element: "span",
            className: "px-6 py-2 font-medium",
            innerText: quantity,
          }),
          // Increase button
          El({
            element: "button",
            className: "px-4 py-2 text-lg",
            innerText: "+",
            eventListener: [
              {
                event: "click",
                callback: () => onQuantityChange(quantity + 1),
              },
            ],
          }),
        ],
      }),
    ],
  });
}
