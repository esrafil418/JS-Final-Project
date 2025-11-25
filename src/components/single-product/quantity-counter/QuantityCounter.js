import { El } from "../../../utils/el";

export function QuantityCounter({ quantity = 1, onQuantityChange }) {
  const maxQuantity = 4;
  const validQuantity = Math.min(maxQuantity, Math.max(1, quantity));
  disabled: validQuantity > maxQuantity;

  return El({
    element: "div",
    className: "flex items-center gap-5",
    children: [
      El({
        element: "span",
        className: "font-semibold text-[1rem] text-[#152536]",
        innerText: "Quantity",
      }),
      El({
        element: "div",
        className: "flex items-center rounded-full bg-[#f3f3f3]",
        children: [
          El({
            element: "button",
            className:
              "px-4 text-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed",
            innerText: "-",
            disabled: validQuantity <= 1,
            eventListener: [
              {
                event: "click",
                callback: () => onQuantityChange(1, validQuantity - 1),
              },
            ],
          }),
          El({
            element: "span",
            className: "py-[0.35rem] font-medium min-w-8 text-center",
            innerText: validQuantity,
          }),
          El({
            element: "button",
            className: "px-4 py-[0.35rem] text-2xl",
            innerText: "+",
            eventListener: [
              {
                event: "click",
                callback: () =>
                  onQuantityChange(maxQuantity, validQuantity + 1),
              },
            ],
          }),
        ],
      }),
    ],
  });
}
