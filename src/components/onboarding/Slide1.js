import { El } from "../../utils/el";
import { ICONS } from "../../constants/icons";

export function Slide1() {
  return El({
    element: "div",
    className: "swiper-slide font-inter flex flex-col h-screen",
    children: [
      El({
        element: "div",
        className: "flex flex-col items-center mt-[24.5rem] mb-[7.3125rem]",
        children: [
          El({
            element: "div",
            className: "flex justify-center items-center gap-[0.75rem]",
            children: [
              El({
                element: "div",
                className:
                  "relative w-[3.6875rem] h-[3.6875rem] bg-black bg-center bg-cover rounded-full",
                style: { backgroundImage: `url(${ICONS.ELLIPSE})` },
                children: [
                  El({
                    element: "img",
                    className:
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.65875rem] h-[2.495625rem] object-contain",
                    src: ICONS.LOGO_1,
                  }),
                ],
              }),
              El({
                element: "p",
                className: "font-bold text-[3.25rem] text-[#152536]",
                innerText: "Shoea",
              }),
            ],
          }),
          El({ element: "div", className: "flex-1" }),
          El({
            element: "div",
            className: "mt-[19.25rem]",
            innerHTML: `
              <svg class="animate-spin" fill="#000000" width="3.1rem" height="3.1rem" viewBox="0 0 16 16">
                <g><path d="M8,1V2.8A5.2,5.2,0,1,1,2.8,8H1A7,7,0,1,0,8,1Z"></path></g>
              </svg>
            `,
          }),
        ],
      }),
    ],
  });
}
