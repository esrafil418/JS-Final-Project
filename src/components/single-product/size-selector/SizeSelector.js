import { El } from "../../../utils/el";

export function SizeSelector({ sizes = [], selectedSize, onSizeSelect }) {
  if (!sizes || sizes.length === 0) {
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
          element: "p",
          className: "text-gray-500 text-sm",
          innerText: "No sizes available",
        }),
      ],
    });
  }

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
        className: "flex gap-3 flex-wrap",
        children: sizes.map((size) =>
          El({
            element: "button",
            className: `w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all font-medium ${
              selectedSize === size
                ? "border-black bg-black text-white"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`,
            innerText: size,
            eventListener: [
              {
                event: "click",
                callback: () => {
                  console.log("Selected size:", size);
                  onSizeSelect(size);
                },
              },
            ],
          })
        ),
      }),
    ],
  });
}
