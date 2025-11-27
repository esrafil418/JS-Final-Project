import { AuthForm } from "./AuthForm";

export function LoginForm() {
  return AuthForm({
    type: "login",
    title: "Login to Your Account",
    buttonText: "Login",
    switchText: "Signup",
    switchRoute: "/signup",
  });
}
