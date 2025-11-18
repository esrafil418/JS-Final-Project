import { El } from "../../utils/el";

export function Slide3(onNext) {
  return El({
    element: "div",
    className:
      "swiper-slide flex flex-col items-center overflow-hidden h-screen",
    children: [
      El({
        element: "img",
        className: "w-full h-[37.625rem] scale-110 object-cover",
        src: "/public/images/page-3.jpg",
      }),
      El({
        element: "div",
        className:
          "flex flex-col justify-center items-center mt-[3rem] gap-[2rem]",
        children: [
          El({
            element: "p",
            className: "w-[23.75rem] text-[2rem] font-[600] text-center",
            innerText: "We provide high quality products just for you",
          }),
          El({
            element: "div",
            className:
              "flex w-[6.375rem] mt-[1rem] justify-between items-center",
            children: [
              El({
                element: "div",
                className: "w-[1.875rem] h-[0.1875rem] bg-[#000000]",
                dataset: { index: 0 },
              }),
              El({
                element: "div",
                className: "w-[1.875rem] h-[0.1875rem] bg-[#808080]",
                dataset: { index: 1 },
              }),
              El({
                element: "div",
                className: "w-[1.875rem] h-[0.1875rem] bg-[#808080]",
                dataset: { index: 2 },
              }),
            ],
          }),
          El({
            element: "button",
            className:
              "bg-[#212529] text-white text-[0.875rem] font-[500] px-4 w-[23.75rem] border-[1px] rounded-[1.875rem] py-[12px]",
            innerText: "Next",
            onclick: () => onNext && onNext(),
          }),
        ],
      }),
    ],
  });
}
