import { El } from "../../utils/el";
import { router } from "../../utils/router";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export function Onboarding() {
  const container = El({
    element: "div",
    className: "swiper h-screen w-full",
    children: [
      El({
        element: "div",
        className: "swiper-wrapper",

        children: [
          //! Slide 1
          El({
            element: "div",
            className: "swiper-slide font-inter flex flex-col h-screen",
            children: [
              El({
                element: "div",
                className:
                  "flex flex-col items-center mt-[24.5rem] mb-[7.3125rem]",
                children: [
                  El({
                    element: "div",
                    className: "flex justify-center items-center gap-[0.75rem]",
                    children: [
                      El({
                        element: "div",
                        className:
                          "relative w-[3.6875rem] h-[3.6875rem] bg-black bg-center bg-cover rounded-full",
                        style: {
                          backgroundImage: "url('/icons/Ellipse 1.png')",
                        },
                        children: [
                          El({
                            element: "img",
                            className:
                              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.65875rem] h-[2.495625rem] object-contain",
                            src: "/icons/logo.png",
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
                  El({
                    element: "div",
                    className: "flex-1",
                  }),
                  El({
                    element: "div",
                    className: "mt-[19.25rem]",
                    innerHTML: `
            <svg class="animate-spin" fill="#000000" width="3.1rem" height="3.1rem" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M8,1V2.8A5.2,5.2,0,1,1,2.8,8H1A7,7,0,1,0,8,1Z"></path> </g> </g></svg>
            `,
                  }),
                ],
              }),
            ],
          }),
          //! Slide 2
          El({
            element: "img",
            className:
              "swiper-slide flex flex-col items-center overflow-hidden relative w-full h-full bg-center bg-cover",
            src: "/images/onboarding-page-2.png",

            //? background image
            children: [
              //? Texts
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
                        src: "/public/images/👋.png",
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
          }),

          //! Slide 3
          El({
            element: "div",
            className:
              "swiper-slide flex flex-col items-center overflow-hidden h-screen",
            children: [
              // image
              El({
                element: "img",
                className: "w-full h-[37.625rem] scale-110 object-cover",
                src: "/public/images/page-3.jpg",
              }),
              // texts
              El({
                element: "div",
                className:
                  "flex flex-col justify-center items-center mt-[3rem] gap-[3rem]",
                children: [
                  El({
                    element: "p",
                    className: "w-[23.75] text-[2rem] font-[600] text-center",
                    innerText: "We provide high quality products just for you",
                  }),
                  // Pagination
                  El({
                    element: "div",
                    id: "onboard-pagination",
                    className:
                      "flex w-[6.375rem] mt-[1rem] justify-between  items-center",
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
                      "bg-[#212529] text-white text-[0.875rem] font-[500] px-4 w-[23.75rem] border-[1px] rounded-[1.875rem] py-[12px] mb-[1.5rem]",
                    innerText: "Next",
                    onclick: () => swiper.slideNext(),
                  }),
                ],
              }),
            ],
          }),

          //! Slide 4
          El({
            element: "div",
            className:
              "swiper-slide flex flex-col items-center overflow-hidden h-screen",
            children: [
              // image
              El({
                element: "img",
                className: "w-full h-[37.625rem] scale-110 object-cover",
                src: "/public/images/page-4.jpg",
              }),
              // texts
              El({
                element: "div",
                className:
                  "flex flex-col justify-center items-center mt-[3rem] gap-[3rem]",
                children: [
                  El({
                    element: "p",
                    className: "w-[23.75] text-[2rem] font-[600] text-center",
                    innerText: "We provide high quality products just for you",
                  }),
                  // Pagination
                  El({
                    element: "div",
                    id: "onboard-pagination",
                    className:
                      "flex w-[6.375rem] mt-[1rem] justify-between  items-center",
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
                      "bg-[#212529] text-white text-[0.875rem] font-[500] px-4 w-[23.75rem] border-[1px] rounded-[1.875rem] py-[12px] mb-[1rem]",
                    innerText: "Next",
                    onclick: () => swiper.slideNext(),
                  }),
                ],
              }),
            ],
          }),

          //! Slide 5
          El({
            element: "div",
            className:
              "swiper-slide flex flex-col items-center overflow-hidden h-screen",
            children: [
              // image
              El({
                element: "img",
                className: "w-full h-[37.625rem] scale-110 object-cover",
                src: "/public/images/page-5.jpg",
              }),
              // texts
              El({
                element: "div",
                className:
                  "flex flex-col justify-center items-center mt-[3rem] gap-[3rem]",
                children: [
                  El({
                    element: "p",
                    className: "w-[23.75] text-[2rem] font-[600] text-center",
                    innerText: "We provide high quality products just for you",
                  }),
                  // Pagination
                  El({
                    element: "div",
                    id: "onboard-pagination",
                    className:
                      "flex w-[6.375rem] mt-[1rem] justify-between  items-center",
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
                      "bg-[#212529] text-white text-[0.875rem] font-[500] px-4 w-[23.75rem] border-[1px] rounded-[1.875rem] py-[12px] mb-[1rem]",
                    innerText: "Get Start",
                    onclick: () => router.navigate("/home"),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  let swiper;

  setTimeout(() => {
    swiper = new Swiper(".swiper", {
      direction: "horizontal",
      pagination: { el: ".swiper-pagination", clickable: true },
      allowTouchMove: true,

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },

      on: {
        slideChange: () => {
          if (swiper.activeIndex === 0) swiper.params.autoplay.delay = 3000;
          if (swiper.activeIndex === 1) swiper.params.autoplay.delay = 5000;
          if (swiper.activeIndex >= 2) swiper.autoplay.stop();
        },
      },
    });

    swiper.on("slideChange", () => {
      const indicatorIndex = swiper.activeIndex - 2;

      document.querySelectorAll("#onboard-pagination div")?.forEach((el) => {
        if (Number(el.dataset.index) === indicatorIndex) {
          el.style.backgroundColor = "#000000";
        } else {
          el.style.backgroundColor = "#808080";
        }
      });
    });
  });

  return container;
}
