import { El } from "../../utils/el";
import { router } from "../../utils/router";

export function EmptyCart() {
  return El({
    element: "div",
    className: "flex flex-col items-center justify-center h-64 p-4",
    children: [
      El({
        element: "div",
        className: "text-6xl mb-4",
        innerText: "🛒"
      }),
      El({
        element: "h2",
        className: "text-xl font-bold mb-2",
        innerText: "Your cart is empty"
      }),
      El({
        element: "p",
        className: "text-gray-500 text-center mb-6",
        innerText: "Looks like you haven't added any items to your cart yet."
      }),
      El({
        element: "button",
        className: "bg-black text-white px-6 py-3 rounded-lg",
        innerText: "Start Shopping",
        eventListener: [{
          event: "click",
          callback: () => router.navigate("/home")
        }]
      })
    ]
  });
}