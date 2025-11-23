import { El } from "../../../utils/el";

export function RemoveModal({ item, onConfirm, onCancel }) {
  return El({
    element: "div",
    id: "remove-modal",
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-end z-50",
    children: [
      El({
        element: "div",
        className: "bg-white rounded-t-3xl p-6 w-full",
        children: [
          El({
            element: "div",
            className: "flex gap-4 mb-6",
            children: [
              El({
                element: "img",
                src: item.imageURL,
                alt: item.name,
                className: "w-16 h-16 rounded-lg object-cover",
              }),
              El({
                element: "div",
                children: [
                  El({
                    element: "h3",
                    className: "font-medium",
                    innerText: item.name,
                  }),
                  El({
                    element: "p",
                    className: "text-sm text-gray-500",
                    innerText: `Color: ${item.color} | Size: ${item.size}`,
                  }),
                ],
              }),
            ],
          }),
          El({
            element: "div",
            className: "flex gap-3",
            children: [
              El({
                element: "button",
                className: "flex-1 border border-gray-300 py-3 rounded-lg",
                innerText: "Cancel",
                eventListener: [{ event: "click", callback: onCancel }],
              }),
              El({
                element: "button",
                className: "flex-1 bg-red-500 text-white py-3 rounded-lg",
                innerText: "Yes, Remove",
                eventListener: [{ event: "click", callback: onConfirm }],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
