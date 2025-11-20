import { El } from "../../utils/el";
import { router } from "../../utils/router";

export function BackButton({ onClick }) {
  return El({
    element: "button",
    className: "absolute left-6 top-4 text-2xl cursor-pointer",
    innerText: "←",
    eventListener: [{
      event: "click",
      callback: onClick || (() => router.navigate(-1))
    }]
  });
}