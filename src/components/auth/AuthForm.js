import { El } from "../../utils/el";
import { router } from "../../utils/router";
import { authRequest } from "../../api/authorization";
import { BackButton } from "../base/buttons/BackButton";
import { Logo } from "../base/logos/Logo";
import { FormTitle } from "../base/titles/FormTitle";
import { usernameInput } from "../base/inputs/UsernameInput";
import { PasswordInput } from "../base/inputs/PasswordInput";
import { SwitchButton } from "../base/buttons/SwitchButton";
import { SubmitButton } from "../base/buttons/SubmitButton";

export function updateButtonState() {
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
      BackButton("/onboarding"),

      // Logo
      Logo(),

      // Title
      FormTitle(title),

      /** --- Username input --- */
      usernameInput(),

      /** --- Password input --- */
      PasswordInput(showPassword),

      /** --- Switch (Signup/Login) link --- */
      SwitchButton(type, switchRoute, switchText),

      /** --- Log Message --- */
      El({
        element: "p",
        id: "log-message",
        innerText: "",
        className: "text-center text-sm text-red-500 mt-3 h-5",
      }),

      /** --- Submit button --- */
      SubmitButton(buttonText, endpoint),
    ],
  });

  return container;
}
