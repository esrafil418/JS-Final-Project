import { AuthForm } from "./AuthForm";

export function SignupForm() {
  return AuthForm({
    type: "signup",
    title: "Signup to Your Account",
    buttonText: "Signin",
    switchText: "Login",
    switchRoute: "/login",
  });
}
