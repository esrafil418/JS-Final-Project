import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { AuthForm } from "./AuthForm";

export function Auth({ type }) {
  return type === "login" ? LoginForm() : SignupForm();
}
