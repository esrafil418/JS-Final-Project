import { El } from "../../utils/el";

export function CartHeader() {
  return El({
    element: "div",
    className: "flex justify-between items-center p-4 border-b",
    children: [
      El({
        element: "h1",
        className: "text-xl font-bold",
        innerText: "My Cart"
      }),
      El({
        element: "img",
        src: "/icons/search.svg",
        className: "w-6 h-6"
      })
    ]
  });
}