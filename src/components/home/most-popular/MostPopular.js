import { El } from "../../../utils/el";

export function MostPopular() {
  return El({
    element: "div",
    className: "!mb-[0.95rem]",
    children: [
      El({
        element: "div",
        className: "w-[23.75rem] mx-[1.5rem] flex justify-between items-center",
        children: [
          El({
            element: "div",
            className: "text-[1.25rem] font-semibold text-[#152536]",
            innerHTML: "Most Popular",
          }),
          El({
            element: "div",
            className: "text-[1rem] font-[600] text-[#152536]",
            innerHTML: "See All",
          }),
        ],
      }),
    ],
  });
}
