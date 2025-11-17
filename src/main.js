import "./style.css";
import { router } from "./utils/router";
import { Onboarding } from "./pages/onboarding/onboarding";
import { Auth } from "./pages/auth/auth";

const app = document.getElementById("app");

router.addRoute("/onboarding", () => Onboarding());
router.addRoute("/login", () => Auth({ type: "login" }));
router.addRoute("/signup", () => Auth({ type: "signup" }));

router.init(app);
