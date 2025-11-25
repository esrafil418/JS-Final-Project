import { El } from "../../../utils/el";

export function ProductImage({ imageURL, alt, className = "", children = [] }) {
  return El({
    element: "div",
    className: `w-full h-95 bg-gray-100 rounded-lg overflow-hidden ${className}`,
    children: [
      El({
        element: "img",
        src: imageURL,
        alt: alt,
        className: "w-full h-full object-cover",
        eventListener: [
          {
            event: "error",
            callback: (e) => {
              e.target.src = "/images/placeholder-image.png";
            },
          },
        ],
      }),
      ...children,
    ],
  });
}
