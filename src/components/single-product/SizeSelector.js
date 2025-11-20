import { El } from "../../utils/el";

export function SizeSelector({ sizes, selectedSize, onSizeSelect }) {
  return El({
    element: "div",
    className: "space-y-3",
    children: [
      El({
        element: "h3",
        className: "font-semibold text-lg",
        innerText: "Size",
      }),
      El({
        element: "div",
        className: "flex gap-3",
        children: sizes.map((size) =>
          El({
            element: "button",
            className: `w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
              selectedSize === size
                ? "border-black bg-black text-white"
                : "border-gray-300 hover:border-gray-400"
            }`,
            innerText: size,
            eventListener: [
              {
                event: "click",
                callback: () => onSizeSelect(size),
              },
            ],
          })
        ),
      }),
    ],
  });
}
