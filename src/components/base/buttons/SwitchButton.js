import { El } from "../../../utils/el";
import { router } from "../../../utils/router";
import { ROUTES } from "../../../constants";

export function SwitchButton(type, switchRoute, switchText) {
  return El({
    element: "p",
    innerText: switchText,
    className:
      "mt-[1.6875rem] text-[0.875rem] cursor-pointer text-[0.875rem] select-none",
    eventListener: [
      {
        event: "click",
        callback: () =>
          router.navigate(type === "login" ? ROUTES.SIGNUP : ROUTES.LOGIN),
      },
    ],
  });
}
