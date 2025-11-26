import { ICONS } from "../../../constants/icons";
import { El } from "../../../utils/el";
import { QuantityCounter } from "../../single-product";

const colors = {
  black: "#000",
  white: "#f1f1f1",
  brown: "#8B4513",
  blue: "#00f",
  red: "#f00",
};

const sizes = [41, 43, 45];

export function CartItem({ item, onRemove, onQuantityChange }) {
  const colorKeys = Object.keys(colors);
  const normalizedColor = item.color ? item.color.toLowerCase() : null;

  if (!item.fixedColor) {
    item.fixedColor =
      normalizedColor && colors[normalizedColor]
        ? normalizedColor
        : colorKeys[Math.floor(Math.random() * colorKeys.length)];
  }

  if (!item.fixedSize) {
    item.fixedSize =
      item.size || sizes[Math.floor(Math.random() * sizes.length)];
  }

  const formattedPrice = `$ ${(+item.price).toFixed(2)}`;

  return El({
    element: "div",
    className:
      "w-[380px] h-[10rem] bg-white rounded-xl p-4 mx-auto mb-4 shadow-sm hover:shadow-md transition-all",
    children: [
      El({
        element: "div",
        className: "flex gap-4 h-full",
        children: [
          El({
            element: "img",
            src: item.imageURL,
            alt: item.name,
            className: "w-28 h-28 rounded-xl object-cover", // تصویر بزرگتر شد
          }),

          El({
            element: "div",
            className: "flex-1 flex flex-col justify-between",
            children: [
              El({
                element: "div",
                className: "flex justify-between items-start",
                children: [
                  El({
                    element: "h3",
                    className:
                      "font-medium text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]", // تک خطی با سه نقطه
                    innerText: item.name,
                  }),
                  El({
                    element: "img",
                    src: ICONS.TRASH,
                    className:
                      "w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition",
                    eventListener: [{ event: "click", callback: onRemove }],
                  }),
                ],
              }),

              El({
                element: "div",
                className:
                  "flex items-center gap-2 text-xs text-gray-700 select-none",
                children: [
                  El({
                    element: "div",
                    className: "w-4 h-4 rounded-full border border-gray-300", // color box
                    restAttrs: {
                      style: `background-color: ${colors[item.fixedColor]};`,
                    },
                  }),

                  El({
                    element: "span",
                    className: "capitalize", // اولین حرف بزرگ
                    innerText: item.fixedColor,
                  }),

                  El({
                    element: "span",
                    className: "text-gray-400",
                    innerText: "|",
                  }),

                  El({
                    element: "span",
                    innerText: `Size ${item.fixedSize}`,
                  }),
                ],
              }),

              El({
                element: "div",
                className: "flex justify-between items-center",
                children: [
                  El({
                    element: "span",
                    className: "font-bold text-sm",
                    innerText: formattedPrice,
                  }),

                  QuantityCounter({
                    quantity: item.quantity,
                    onQuantityChange,
                    showLabel: false,
                    className: "scale-90",
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
