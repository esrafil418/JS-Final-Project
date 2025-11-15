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
            className: "swiper-slide relative w-full h-full bg-center bg-cover",
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
            className: "swiper-slide bg-yellow-200 h-screen",
            children: [
              El({
                element: "img",
                className: "w-[26.875rem] h-[41.0625rem] object-cover",
                src: "/public/images/page-3.jpg"
              }),
              El({
                element: "p",
                innerText: "Slide 3",
              }),
              El({
                element: "button",
                className: "mt-6 bg-black text-white px-4 py-2 rounded",
                innerText: "Next",
                onclick: () => swiper.slideNext(),
              }),
            ],
          }),

          //! Slide 4
          El({
            element: "div",
            className: "swiper-slide bg-blue-200 h-screen",
            children: [
              El({
                element: "div",
                innerText: "Slide 4",
              }),
              El({
                element: "button",
                className: "mt-6 bg-black text-white px-4 py-2 rounded",
                innerText: "Next",
                onclick: () => swiper.slideNext(),
              }),
            ],
          }),

          //! Slide 5
          El({
            element: "div",
            className: "swiper-slide",
            children: [
              El({
                element: "p",
                innerText: "Slide 5",
              }),
              El({
                element: "button",
                className: "mt-6 bg-black text-white px-4 py-2 rounded",
                innerText: "Start",
                onclick: () => router.navigate("/home"),
              }),
            ],
          }),
        ],
      }),
      El({
        element: "div",
        className: "swiper-pagination",
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
          if (swiper.activeIndex >= 1) swiper.autoplay.stop();
        },
      },
    });
  });

  return container;
}

// El({
//   element: "div",
//   className: "bg-green-100 font-inter flex flex-col h-screen",
//   children: [
//     El({
//       element: "div",
//       className: "flex flex-col justify-center items-center",
//       children: [
//         El({
//           element: "div",
//           className: "flex justify-center items-center gap-[0.75rem]",
//           children: [
//             El({
//               element: "div",
//               className:
//                 "relative w-[3.6875rem] h-[3.6875rem] bg-black bg-center bg-cover rounded-full",
//               style: {
//                 backgroundImage: "url('../../../icons/Ellipse 1.png')",
//               },
//               children: [
//                 El({
//                   element: "img",
//                   className:
//                     "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.65875rem] h-[2.495625rem] object-contain",
//                   src: "../../../icons/logo.png",
//                 }),
//               ],
//             }),
//             El({
//               element: "p",
//               className: "font-bold text-[3.25rem]",
//               innerText: "Shoea",
//             }),
//           ],
//         }),
//         El({
//           element: "div",
//           className: "flex-1",
//         }),
//         El({
//           element: "div",
//           className: "mt-[19.25rem]",
//           innerHTML: `
//             <svg class="animate-spin" fill="#000000" width="3rem" height="3rem" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M8,1V2.8A5.2,5.2,0,1,1,2.8,8H1A7,7,0,1,0,8,1Z"></path> </g> </g></svg>
//             `,
//         }),
//       ],
//     }),
//   ],
// });
