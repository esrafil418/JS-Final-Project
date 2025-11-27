import { ICONS } from "../../../constants/icons";
import { El } from "../../../utils/el";
import { updateButtonState } from "../../auth/AuthForm";

export function PasswordInput(showPassword) {
  return El({
    element: "div",
    className: "relative w-[23.75rem] h-[2.3125rem] mt-[1.25rem]",
    children: [
      El({
        element: "img",
        src: ICONS.LOCK,
        id: "passIcon",
        className:
          "absolute left-4 top-1/2 -translate-y-1/2 w-[0.875rem] opacity-40 transition-all duration-200",
      }),
      El({
        element: "input",
        className:
          "bg-[#fafafa] w-full h-full pl-9 rounded-[0.25rem] text-[0.875rem] font-[400] outline-none focus:border-black transition-all",
        type: "password",
        placeholder: "Password",
        required: true,
        id: "password",
        eventListener: [
          {
            event: "focus",
            callback: () => {
              document
                .getElementById("passIcon")
                .classList.remove("opacity-40");
              document
                .getElementById("toggleEye")
                .classList.remove("opacity-40");
            },
          },
          {
            event: "blur",
            callback: () => {
              const input = document.getElementById("password");
              const icon = document.getElementById("passIcon");
              const eye = document.getElementById("toggleEye");

              if (input.value.trim() === "") {
                icon.classList.add("opacity-40");
                eye.classList.add("opacity-40");
              } else {
                icon.classList.remove("opacity-40");
                eye.classList.remove("opacity-40");
              }
            },
          },
          {
            event: "input",
            callback: () => {
              const input = document.getElementById("password");
              const icon = document.getElementById("passIcon");
              const eye = document.getElementById("toggleEye");

              if (input.value.trim() !== "") {
                icon.classList.remove("opacity-40");
                eye.classList.remove("opacity-40");
              } else {
                icon.classList.add("opacity-40");
                eye.classList.add("opacity-40");
              }
              updateButtonState();
            },
          },
        ],
      }),
      El({
        element: "img",
        src: ICONS.EYE_SLASH,
        id: "toggleEye",
        className:
          "absolute right-4 top-1/2 -translate-y-1/2 w-[1rem] h-[1rem] cursor-pointer transition-all opacity-40",
        eventListener: [
          {
            event: "click",
            callback: () => {
              const input = document.getElementById("password");
              const eye = document.getElementById("toggleEye");

              showPassword = !showPassword;

              if (showPassword) {
                input.type = "text";
                eye.src = ICONS.EYE;
              } else {
                input.type = "password";
                eye.src = ICONS.EYE_SLASH;
              }
            },
          },
        ],
      }),
    ],
  });
}
