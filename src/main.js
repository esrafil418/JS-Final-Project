import "./style.css";
import { router } from "./utils/router";
import { onboardingPage } from "./pages/onboarding/onboarding";
import { AuthPage } from "./pages/auth/auth";
import { authHelper } from "./utils/auth";
import { Home } from "./pages/home/home";

const app = document.getElementById("app");
const pageContainer = document.createElement("div");
app.appendChild(pageContainer);

router.addRoute("/onboarding", () => onboardingPage());
router.addRoute("/login", () => AuthPage({ type: "login" }));
router.addRoute("/signup", () => AuthPage({ type: "signup" }));
router.addRoute("/", () => Home());

router.init(pageContainer);

router.addRoute("/", () => {
  const token = authHelper.getToken();
  const onboarded = localStorage.getItem("onboarded");

  if (!onboarded) return router.navigate("/onboarding");
  if (!token) return router.navigate("/login");
  return Home();
});
