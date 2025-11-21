import "./style.css";
import { router } from "./utils/router";
import { onboardingPage } from "./pages/onboarding/onboarding";
import { AuthPage } from "./pages/auth/auth";
import { authHelper } from "./utils/auth";
import { Home } from "./pages/home/home";
import { SingleProductPage } from "./pages/single-product/single-product";
import { CartPage } from "./pages/cart/cart";
import { APP_KEYS, ROUTES } from "./constants";

const app = document.getElementById("app");
const pageContainer = document.createElement("div");
app.appendChild(pageContainer);

router.addRoute(ROUTES.ONBOARDING, () => onboardingPage());
router.addRoute(ROUTES.LOGIN, () => AuthPage({ type: "login" }));
router.addRoute(ROUTES.SIGNUP, () => AuthPage({ type: "signup" }));
router.addRoute(ROUTES.PRODUCT(), (params) => SingleProductPage(params));
router.addRoute(ROUTES.CART, () => CartPage());

router.addRoute(ROUTES.HOME, () => {
  const token = authHelper.getToken();
  const onboarded = localStorage.getItem(APP_KEYS.ONBOARDED);

  console.log("Token:", !!token, "/ Onboarded:", onboarded);

  if (!onboarded) {
    router.navigate(ROUTES.ONBOARDING);
    return null;
  }

  if (!token) {
    router.navigate(ROUTES.LOGIN);
    return null;
  }

  return Home();
});

router.init(pageContainer);
