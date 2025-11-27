import { El } from "../../../utils/el";
import { router } from "../../../utils/router";
import { ICONS } from "../../../constants/icons";
import { ROUTES } from "../../../constants";

export function BottomNav() {
  const navWrap = El({
    element: "div",
    className:
      "fixed bottom-0 left-0 w-[23.75rem] h-[4.125rem] bg-white flex items-center justify-around z-50 mx-[1.5rem]",
  });

  const items = [
    { key: "home", icon: ICONS.HOME, route: ROUTES.HOME },
    { key: "cart", icon: ICONS.CART, route: ROUTES.CART },
    { key: "orders", icon: ICONS.ORDERS },
    { key: "wallet", icon: ICONS.WALLET },
    { key: "profile", icon: ICONS.PROFILE },
  ];

  function updateActive() {
    const current = window.location.pathname;

    [...navWrap.children].forEach((btn) => {
      const route = btn.getAttribute("data-route");
      const img = btn.querySelector("img");

      img.style.opacity = route === current ? "1" : "0.6";
    });
  }

  function createNav() {
    items.forEach((it) => {
      const btn = El({
        element: "button",
        className:
          "flex flex-col items-center justify-center w-[3.5rem] h-full",
        restAttrs: {
          "data-route": it.route || "",
        },
        eventListener: [
          {
            event: "click",
            callback: () => {
              if (it.route) router.navigate(it.route);
              updateActive();
            },
          },
        ],
        children: [
          El({
            element: "img",
            src: it.icon,
            className: "w-[1.8rem] opacity-60 transition-all",
            restAttrs: { alt: it.key },
          }),
        ],
      });

      navWrap.appendChild(btn);
    });
  }

  createNav();
  updateActive();

  window.addEventListener("popstate", updateActive);

  return navWrap;
}
