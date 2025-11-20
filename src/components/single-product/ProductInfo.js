import { El } from "../../utils/el";

export function ProductInfo({ name, rating, description }) {
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
        className: "text-yellow-500",
        innerText: `⭐ ${rating}/5`,
      }),
      El({
        element: "hr",
        className: "border-gray-200",
      }),
      El({
        element: "p",
        className: "text-gray-600 leading-relaxed",
        innerText: description,
      }),
    ],
  });
}
