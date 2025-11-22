import { El } from "../../../utils/el";
import { router } from "../../../utils/router";
import { ICONS } from "../../../constants/icons";
import { ROUTES } from "../../../constants";

export function BottomNav() {
  const navWrap = El({
    element: "div",
    className:
      "fixed bottom-0 left-0 w-[428px] h-[66px] bg-white border-t border-gray-200 flex items-center justify-around z-50",
  });

  const items = [
    { key: "home", icon: ICONS.HOME, route: ROUTES.HOME },
    { key: "cart", icon: ICONS.CART, route: ROUTES.CART },
    { key: "orders", icon: ICONS.ORDERS },
    { key: "wallet", icon: ICONS.WALLET },
    { key: "profile", icon: ICONS.PROFILE },
  ];

  function getCurrentPath() {
    return window.location.pathname || ROUTES.HOME;
  }

  function render() {
    navWrap.innerHTML = "";
    const current = getCurrentPath();
    for (const it of items) {
      const isActive = current === it.route;
      const btn = El({
        element: "button",
        className:
          `flex flex-col items-center justify-center gap-1 w-[56px] h-full transition-all ` +
          (isActive ? "text-black" : "text-gray-400"),
        eventListener: [
          {
            event: "click",
            callback: () => {
              if (it.route) router.navigate(it.route);
              router.navigate(it.route);
              setTimeout(render, 50);
            },
          },
        ],
        children: [
          El({
            element: "img",
            src: it.icon,
            className: `w-6 h-6 ${isActive ? "opacity-100" : "opacity-60"}`,
            restAttrs: { alt: it.key },
          }),
        ],
      });
      navWrap.appendChild(btn);
    }
  }

  render();

  window.addEventListener("popstate", render);

  return navWrap;
}
