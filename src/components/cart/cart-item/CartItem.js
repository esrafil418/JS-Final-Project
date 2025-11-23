import { El } from "../../../utils/el";
import { QuantityCounter } from "../../single-product";

export function CartItem({ item, onRemove, onQuantityChange }) {
  return El({
    element: "div",
    className:
      "w-[380px] h-[230px] bg-white rounded-lg shadow-sm border p-4 mx-auto mb-4",
    children: [
      El({
        element: "div",
        className: "flex gap-4 h-32",
        children: [
          El({
            element: "img",
            src: item.imageURL,
            alt: item.name,
            className: "w-24 h-24 rounded-lg object-cover",
            // fallback to local placeholder when remote image fails
            onerror: function () {
              this.onerror = null;
              this.src = "/images/placeholder-image.jpg";
            },
          }),
          El({
            element: "div",
            className: "flex-1",
            children: [
              El({
                element: "div",
                className: "flex justify-between items-start",
                children: [
                  El({
                    element: "h3",
                    className: "font-medium text-sm flex-1 pr-2",
                    innerText: item.name,
                  }),
                  El({
                    element: "button",
                    className: "text-gray-400 hover:text-red-500",
                    innerHTML: "🗑️",
                    eventListener: [{ event: "click", callback: onRemove }],
                  }),
                ],
              }),
              El({
                element: "div",
                className: "text-xs text-gray-500 mt-2",
                innerText: `Color: ${item.color} | Size: ${item.size}`,
              }),
              El({
                element: "div",
                className: "flex justify-between items-center mt-4",
                children: [
                  El({
                    element: "span",
                    className: "font-bold",
                    innerText: `$${item.price}`,
                  }),
                  QuantityCounter({
                    quantity: item.quantity,
                    onQuantityChange: onQuantityChange,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
