// BaseSlide.js
import { El } from "../../utils/el";

export function BaseSlide({
  imageSrc,
  title,
  buttonText,
  onButtonClick,
  activeDotIndex,
}) {
  return El({
    element: "div",
    className:
      "swiper-slide flex flex-col items-center overflow-hidden h-screen",
    children: [
      El({
        element: "img",
        className: "w-full h-[37.625rem] scale-110 object-cover",
        src: imageSrc,
      }),
      El({
        element: "div",
        className:
          "flex flex-col justify-center items-center mt-[3rem] gap-[2rem]",
        children: [
          El({
            element: "p",
            className: "w-[23.75rem] text-[2rem] font-[600] text-center",
            innerText: title,
          }),
          // Pagination Dots
          El({
            element: "div",
            className:
              "flex w-[6.375rem] mt-[1rem] justify-between items-center",
            children: [0, 1, 2].map((index) =>
              El({
                element: "div",
                className: `w-[1.875rem] h-[0.1875rem] ${
                  index === activeDotIndex ? "bg-[#000000]" : "bg-[#808080]"
                }`,
              })
            ),
          }),
          El({
            element: "button",
            className:
              "bg-[#212529] text-white text-[0.875rem] font-[500] px-4 w-[23.75rem] border-[1px] rounded-[1.875rem] py-[12px]",
            innerText: buttonText,
            onclick: onButtonClick,
          }),
        ],
      }),
    ],
  });
}
