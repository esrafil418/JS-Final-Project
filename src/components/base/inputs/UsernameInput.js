import { ICONS } from "../../../constants/icons";
import { El } from "../../../utils/el";
import { updateButtonState } from "../../auth/AuthForm";

export function usernameInput() {
  return El({
    element: "div",
    className: "relative w-[23.75rem] h-[2.3125rem] mt-[3rem]",
    children: [
      El({
        element: "img",
        src: ICONS.EMAIL,
        id: "userIcon",
        className:
          "absolute left-4 top-1/2 -translate-y-1/2 w-[0.875rem] opacity-40 transition-all duration-200",
      }),
      El({
        element: "input",
        type: "text",
        placeholder: "Username",
        required: true,
        id: "username",
        className:
          "bg-[#fafafa] w-full h-full pl-9 rounded-[0.25rem] text-[0.875rem] font-[400] outline-none focus:border-black transition-all",
        eventListener: [
          {
            event: "focus",
            callback: () => {
              document
                .getElementById("userIcon")
                .classList.remove("opacity-40");
              document.getElementById("username").classList.add("border-black");
            },
          },
          {
            event: "blur",
            callback: () => {
              const input = document.getElementById("username");
              const icon = document.getElementById("userIcon");

              if (input.value.trim() === "") {
                icon.classList.add("opacity-40");
              } else {
                icon.classList.remove("opacity-40");
              }
            },
          },
          {
            event: "input",
            callback: () => {
              const input = document.getElementById("username");
              const icon = document.getElementById("userIcon");

              if (input.value.trim() !== "") {
                icon.classList.remove("opacity-40");
              } else {
                icon.classList.add("opacity-40");
              }
              updateButtonState();
            },
          },
        ],
      }),
    ],
  });
}
