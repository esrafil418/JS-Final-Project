import { El } from "../../../utils/el";

export function ColorSelector({ colors = [], selectedColor, onColorSelect }) {
  if (!colors.length) {
    return El({
      element: "div",
      className: "space-y-3",
      children: [
        El({
          element: "h3",
          className: "font-semibold text-lg",
          innerText: "Color",
        }),
        El({
          element: "p",
          className: "text-gray-500 text-sm",
          innerText: "No colors available",
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
        className: "font-semibold text-[1rem]",
        innerText: "Color",
      }),

      El({
        element: "div",
        className: "flex gap-3 overflow-x-auto flex-nowrap",
        children: colors.map((color) => {
          const code = colorMap(color);
          const normalized = color.trim();
          const isSelected = selectedColor === normalized;

          return El({
            element: "button",
            className:
              "w-10 h-10 shrink-0 rounded-full relative flex items-center justify-center transition",
            restAttrs: { style: `background-color: ${code}` },

            children: [
              isSelected
                ? El({
                    element: "span",
                    className: `absolute inset-0 flex items-center justify-center text-lg ${
                      color === "black" || color === "blue"
                        ? "text-white"
                        : "text-black"
                    }`,
                    innerText: "✔",
                  })
                : [],
            ],

            eventListener: [
              { event: "click", callback: () => onColorSelect(normalized) },
            ],
          });
        }),
      }),
    ],
  });
}

function colorMap(name) {
  const map = {
    black: "#000",
    white: "#f1f1f1",
    brown: "#8B4513",
    blue: "#00f",
    red: "#f00",
  };
  return map[name.toLowerCase().trim()] || "#ccc";
}
