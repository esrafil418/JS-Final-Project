import { BaseSlide } from "./BaseSlide";
import { router } from "../../utils/router";
import { ROUTES } from "../../constants";

export function Slide5() {
  const finishOnboarding = () => {
    localStorage.setItem("onboarded", "true");
    router.navigate(ROUTES.SIGNUP);
  };

  return BaseSlide({
    imageSrc: "/public/images/page-5.jpg",
    title: "We provide high quality products just for you",
    buttonText: "Get Start",
    onButtonClick: finishOnboarding,
    activeDotIndex: 2,
  });
}
