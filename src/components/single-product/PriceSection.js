import { El } from "../../utils/el";

// Product price display and add to cart section
export function PriceSection({ price, quantity, onAddToCart }) {
  const totalPrice = price * quantity;

  return El({
    element: "div",
    className: "space-y-3",
    children: [
      // Price breakdown
      El({
        element: "div",
        className: "flex justify-between items-baseline",
        children: [
          // "Total" label
          El({
            element: "span",
            className: "text-lg text-gray-600",
            innerText: "Total:",
          }),
          // Price calculation
          El({
            element: "div",
            className: "text-right",
            children: [
              // Total amount
              El({
                element: "div",
                className: "text-2xl font-bold",
                innerText: `$${totalPrice}`,
              }),
              // Breakdown (only show if quantity > 1)
              quantity > 1 &&
                El({
                  element: "div",
                  className: "text-sm text-gray-500",
                  innerText: `($${price} × ${quantity})`,
                }),
            ],
          }),
        ],
      }),

      // Add to cart button
      El({
        element: "button",
        className:
          "w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 active:scale-95 transition-all duration-200 shadow-lg",
        innerText: "Add to Cart 🛒",
        eventListener: [
          {
            event: "click",
            callback: onAddToCart,
          },
        ],
      }),
    ],
  });
}
