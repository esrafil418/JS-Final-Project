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
        className: "font-semibold text-lg",
        innerText: "Color",
      }),

      El({
        element: "div",
        className: "flex gap-3",
        children: colors.map((color) => {
          const code = colorCode(color);
          const normalized = color.trim();
          const isSelected = selectedColor === normalized;

          return El({
            element: "button",
            className: `w-10 h-10 rounded-full border-2 transition-all 
              ${
                isSelected
                  ? "border-black ring-2 ring-black ring-offset-2"
                  : "border-gray-300"
              }
            `,
            restAttrs: { style: `background-color: ${code};` },
            title: normalized,
            eventListener: [
              {
                event: "click",
                callback: () => onColorSelect(normalized),
              },
            ],
          });
        }),
      }),
    ],
  });
}

function colorCode(name) {
  const map = {
    black: "#000",
    white: "#fff",
    brown: "#8B4513",
    blue: "#00f",
    red: "#f00",
  };
  return map[name.toLowerCase().trim()] || "#ccc";
}
