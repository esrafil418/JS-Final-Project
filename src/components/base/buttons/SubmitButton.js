import { El } from "../../../utils/el";
import { authRequest } from "../../../api/authorization";

export function SubmitButton(buttonText, endpoint) {
  return El({
    element: "button",
    id: "submitBtn",
    innerText: buttonText,
    className:
      "w-[23.75rem] h-[2.9375rem] bg-[#6f7174] text-white text-[0.875rem] font-[500] rounded-[1.875rem] absolute bottom-[2rem] transition-all duration-300",
    eventListener: [
      {
        event: "click",
        callback: () => authRequest(endpoint),
      },
    ],
  });
}
