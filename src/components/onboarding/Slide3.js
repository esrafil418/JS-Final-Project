import { BaseSlide } from "./BaseSlide";

export function Slide3(onNext) {
  return BaseSlide({
    imageSrc: "/public/images/page-3.jpg",
    title: "We provide high quality products just for you",
    buttonText: "Next",
    onButtonClick: onNext,
    activeDotIndex: 0
  });
}