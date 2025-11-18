import { El } from "../../utils/el";
import { router } from "../../utils/router";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

import { Slide1 } from "./Slide1";
import { Slide2 } from "./Slide2";
import { Slide3 } from "./Slide3";
import { Slide4 } from "./Slide4";
import { Slide5 } from "./Slide5";

export function Onboarding() {
  const container = El({ element: "div", className: "swiper h-screen w-full" });

  let swiper; // global swiper instance

  // Callback هایی که برای هر Slide نیاز داریم
  const nextSlide = () => {
    if (swiper) swiper.slideNext();
  };

  const finishOnboarding = () => {
    localStorage.setItem("onboarded", "true");
    const token = localStorage.getItem("token");
    router.navigate(token ? "/home" : "/signup");
  };

  const slides = [
    Slide1(), // Slide1 بدون دکمه، فقط spinner و لوگو
    Slide2(), // Slide2 بدون دکمه، فقط تصویر و متن
    Slide3(nextSlide), // Slide3 با دکمه Next
    Slide4(nextSlide), // Slide4 با دکمه Next
    Slide5(finishOnboarding), // Slide5 با دکمه Get Start
  ];

  const wrapper = El({
    element: "div",
    className: "swiper-wrapper",
    children: slides,
  });

  container.appendChild(wrapper);

  // Initialize swiper بعد از اینکه DOM آماده شد
  setTimeout(() => {
    swiper = new Swiper(".swiper", {
      direction: "horizontal",
      allowTouchMove: true,
      // we handle the staged auto-advance manually (3s -> slide2, then 5s -> slide3)
      on: {
        slideChange: function () {
          // Pagination برای Slide3-5
          const paginationDivs = document.querySelectorAll(
            "#onboard-pagination div"
          );
          if (paginationDivs.length > 0) {
            paginationDivs.forEach((el) => {
              el.style.backgroundColor =
                Number(el.dataset.index) === swiper.activeIndex - 2
                  ? "#000000"
                  : "#808080";
            });
          }
          // If we've reached slide index 2 (Slide3) or beyond, clear automated timers
          if (swiper.activeIndex >= 2) {
            if (t1) clearTimeout(t1);
            if (t2) clearTimeout(t2);
          }
        },
      },
    });

    // staged auto-advance: Slide1 -> Slide2 after 3s, then Slide2 -> Slide3 after 5s
    let t1 = null;
    let t2 = null;
    t1 = setTimeout(() => {
      if (swiper) swiper.slideNext(); // to Slide2
      // schedule move from Slide2 -> Slide3 after 5s
      t2 = setTimeout(() => {
        if (swiper) swiper.slideNext(); // to Slide3
      }, 5000);
    }, 3000);
  });

  return container;
}
