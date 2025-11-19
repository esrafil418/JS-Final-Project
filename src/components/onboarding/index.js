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
  let swiper;

  const nextSlide = () => swiper?.slideNext();

  const finishOnboarding = () => {
    localStorage.setItem("onboarded", "true");
    router.navigate(localStorage.getItem("token") ? "/home" : "/signup");
  };

  const slides = [
    Slide1(),
    Slide2(),
    Slide3(nextSlide),
    Slide4(nextSlide),
    Slide5(finishOnboarding),
  ];

  const wrapper = El({
    element: "div",
    className: "swiper-wrapper",
    children: slides,
  });

  container.appendChild(wrapper);

  setTimeout(() => {
    swiper = new Swiper(".swiper", {
      direction: "horizontal",
      allowTouchMove: true,
    });

    setTimeout(() => swiper.slideNext(), 3000);
    setTimeout(() => swiper.slideNext(), 6000);
  }, 100);

  return container;
}
