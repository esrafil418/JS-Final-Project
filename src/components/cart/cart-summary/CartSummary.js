import { El } from "../../../utils/el";
import { router } from "../../../utils/router";
import { ICONS } from "../../../constants/icons";

export function CartSummary({ totalPrice, itemCount }) {
  return El({
    element: "div",
    id: "cart-summary",
    className:
      "fixed bottom-16 left-0 right-0 bg-white p-4 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)]",
    // ⬆️ border-t حذف شد و rounded + سایه اضافه شد تا جذاب‌تر شه
    children: [
      El({
        element: "div",
        className: "flex items-center justify-between gap-4",
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
                    src: ICONS?.ADD_TO_CART || "/icons/add-to-cart.svg",
                    className: "w-5 h-5",
                  }),
                ],
              }),
              El({
                element: "span",
                className: "text-[1rem] px-2",
                innerText: `Checkout (${itemCount})`,
              }),
            ],
            eventListener: [
              {
                event: "click",
                callback: () => router.navigate("/checkout"),
              },
            ],
          }),
        ],
      }),
    ],
  });
}
