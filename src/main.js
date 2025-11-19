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
router.addRoute("/home", () => Home());

router.addRoute("/", () => {
  const token = authHelper.getToken();
  const onboarded = localStorage.getItem("onboarded");

  console.log("Token:", !!token, "/ Onboarded:", onboarded);

  if (!onboarded) {
    router.navigate("/onboarding");
    return null;
  }

  if (!token) {
    router.navigate("/login");
    return null;
  }

  return Home();
});

router.init(pageContainer);
