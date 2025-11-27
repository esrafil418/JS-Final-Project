import { BaseSlide } from "./BaseSlide";

export function Slide4(onNext) {
  return BaseSlide({
    imageSrc: "/public/images/page-4.jpg",
    title: "We provide high quality products just for you",
    buttonText: "Next",
    onButtonClick: onNext,
    activeDotIndex: 1,
  });
}
