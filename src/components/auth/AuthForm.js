import { El } from "../../utils/el";
import { router } from "../../utils/router";
import { authRequest } from "../../api/authorization";

function updateButtonState() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const button = document.getElementById("submitBtn");

  if (!button) return;

  if (username && password) {
    button.classList.add("bg-[#212529]");
    button.classList.remove("bg-[#6f7174]");
  } else {
    button.classList.add("bg-[#6f7174]");
    button.classList.remove("bg-[#212529]");
  }
}

export function AuthForm({ type, title, buttonText, switchText, switchRoute }) {
  let showPassword = false;

  const endpoint = type === "login" ? "/auth/login" : "/auth/signup";

  const container = El({
    element: "div",
    className:
      "w-full h-screen flex flex-col items-center relative overflow-hidden",
    children: [
      // Back button
      El({
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
                callback: () => router.navigate("/onboarding"),
              },
            ],
          }),
        ],
      }),

      // Logo
      El({
        element: "img",
        src: "/public/icons/Vector 1.png",
        className:
          "color-black mt-[8.25rem] w-[3.375rem] h-[5.0625rem] object-cover",
      }),

      // Title
      El({
        element: "h1",
        innerText: title,
        className:
          "mt-[6.875rem] text-[#152536] text-center text-[2rem] font-[600] w-[21.375rem]",
      }),

      /** --- Username input --- */
      El({
        element: "div",
        className: "relative w-[23.75rem] h-[2.3125rem] mt-[3rem]",
        children: [
          El({
            element: "img",
            src: "/public/icons/email-14-svgrepo-com.svg",
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
                  document
                    .getElementById("username")
                    .classList.add("border-black");
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
      }),

      /** --- Password input --- */
      El({
        element: "div",
        className: "relative w-[23.75rem] h-[2.3125rem] mt-[1.25rem]",
        children: [
          El({
            element: "img",
            src: "/public/icons/lock-svgrepo-com.svg",
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
            src: "/public/icons/eye-slash-fill-svgrepo-com.svg",
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
                    eye.src = "/public/icons/eye-svgrepo-com.svg";
                  } else {
                    input.type = "password";
                    eye.src = "/public/icons/eye-slash-fill-svgrepo-com.svg";
                  }
                },
              },
            ],
          }),
        ],
      }),

      /** --- Switch (Signup/Login) link --- */
      El({
        element: "p",
        innerText: switchText,
        className:
          "mt-[1.6875rem] text-[0.875rem] cursor-pointer text-[0.875rem] select-none",
        eventListener: [
          {
            event: "click",
            callback: () =>
              router.navigate(type === "login" ? "/signup" : "/login"),
          },
        ],
      }),
      /** --- Log Message --- */
      El({
        element: "p",
        id: "log-message",
        innerText: "",
        className: "text-center text-sm text-red-500 mt-3 h-5",
      }),

      /** --- Submit button --- */
      El({
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
      }),
    ],
  });

  return container;
}
