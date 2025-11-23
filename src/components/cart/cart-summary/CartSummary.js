import { El } from "../../../utils/el";
import { router } from "../../../utils/router";

export function CartSummary({ totalPrice, itemCount }) {
  return El({
    element: "div",
    id: "cart-summary",
    className: "fixed bottom-16 left-0 right-0 bg-white border-t p-4",
    children: [
      El({
        element: "div",
        className: "flex justify-between items-center mb-3",
        children: [
          El({
            element: "span",
            className: "text-gray-600",
            innerText: "Total Price:",
          }),
          El({
            element: "span",
            className: "text-xl font-bold",
            innerText: `$${totalPrice}`,
          }),
        ],
      }),
      El({
        element: "button",
        className: "w-full bg-black text-white py-4 rounded-lg font-semibold",
        innerText: `Checkout (${itemCount})`,
        eventListener: [
          {
            event: "click",
            callback: () => router.navigate("/checkout"),
          },
        ],
      }),
    ],
  });
}
