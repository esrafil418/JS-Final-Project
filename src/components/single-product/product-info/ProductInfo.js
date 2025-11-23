import { El } from "../../../utils/el";

export function ProductInfo({ name, rating = 0, description = "" }) {
  if (!name) {
    return El({
      element: "div",
      className: "text-red-500",
      innerText: "Product information not available",
    });
  }

  return El({
    element: "div",
    className: "space-y-4",
    children: [
      El({
        element: "h1",
        className: "text-2xl font-bold",
        innerText: name,
      }),
      El({
        element: "div",
        className: "flex items-center gap-2",
        children: [
          El({
            element: "span",
            className: "text-yellow-500",
            innerText: "⭐",
          }),
          El({
            element: "span",
            className: "text-gray-700",
            innerText: rating > 0 ? rating.toFixed(1) : "No rating",
          }),
        ],
      }),
      El({
        element: "hr",
        className: "border-gray-200",
      }),
      El({
        element: "p",
        className: "text-gray-600 leading-relaxed",
        innerText: description || "No description available.",
      }),
    ],
  });
}
