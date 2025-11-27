import { El } from "../../../utils/el";
import { router } from "../../../utils/router";

export function BackButton(to) {
  return El({
    element: "div",
    className: "absolute left-[2rem] top-[0.75rem] cursor-pointer",
    children: [
      El({
        element: "button",
        innerText: "←",
        className: "w-[1rem] h-[0.875rem] text-2xl",
        eventListener: [
          {
            event: "click",
            callback: () => router.navigate(to),
          },
        ],
      }),
    ],
  });
}
