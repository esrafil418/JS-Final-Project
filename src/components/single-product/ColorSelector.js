import { El } from "../../utils/el";

// Color selector component for product color variations
export function ColorSelector({ colors, selectedColor, onColorSelect }) {
  return El({
    element: "div",
    className: "space-y-3",
    children: [
      // Section title
      El({
        element: "h3",
        className: "font-semibold text-lg",
        innerText: "Color",
      }),
      // Color swatches container
      El({
        element: "div",
        className: "flex gap-3",
        children: colors.map((color) =>
          // Individual color button
          El({
            element: "button",
            className: `w-10 h-10 rounded-full border-2 transition-all ${
              selectedColor === color
                ? "border-black ring-2 ring-offset-2 ring-black"
                : "border-gray-300 hover:border-gray-400"
            }`,
            style: { backgroundColor: getColorCode(color) },
            title: color,
            eventListener: [
              {
                event: "click",
                callback: () => onColorSelect(color),
              },
            ],
          })
        ),
      }),
    ],
  });
}

function getColorCode(color) {
  const colorMap = {
    Black: "#000000",
    White: "#FFFFFF",
    Red: "#FF0000",
    Blue: "#0000FF",
    Green: "#00FF00",
    Gray: "#808080",
  };
  return colorMap[color] || "#CCCCCC"; // Default fallback
}
