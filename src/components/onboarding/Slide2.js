import { El } from "../../utils/el";

export function Slide2() {
  return El({
    element: "img",
    src: "/images/onboarding-page-2.png",
    className:
      "swiper-slide flex flex-col items-center overflow-hidden relative w-full h-full bg-center bg-cover",
    children: [
      El({
        element: "div",
        className:
          "absolute inset-0 flex flex-col justify-end items-start pb-[4rem] px-[2rem]",
        children: [
          El({
            element: "div",
            className: "flex items-center gap-[1rem]",
            children: [
              El({
                element: "div",
                className: "text-[2.5rem] font-[600]",
                innerText: "Welcome to",
              }),
              El({
                element: "img",
                src: "/images/👋.png",
                className: "w-[2.25rem] h-[2.25rem]",
              }),
            ],
          }),
          El({
            element: "div",
            className: "text-[4.5rem] font-[700]",
            innerText: "Shoea",
          }),
          El({
            element: "div",
            className: "text-[1rem]/[1.375rem] font-[600] w-[22.75rem]",
            innerText:
              "The best sneakers & shoes e-commerse app of the century for your fashion needs!",
          }),
        ],
      }),
    ],
  });
}
