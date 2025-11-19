import { El } from "../../utils/el";
import { router } from "../../utils/router";

export function BottomNav() {
  const navWrap = El({
    element: "div",
    className:
      "fixed bottom-0 left-0 w-[428px] h-[66px] bg-white border-t border-gray-200 flex items-center justify-around z-50",
  });

  const items = [
    { key: "home", icon: "/public/icons/nav-home.svg", route: "/" },
    { key: "cart", icon: "/public/icons/nav-cart.svg" },
    { key: "orders", icon: "/public/icons/nav-orders.svg" },
    { key: "wallet", icon: "/public/icons/nav-wallet.svg" },
    { key: "profile", icon: "/public/icons/nav-profile.svg" },
  ];

  function getCurrentPath() {
    return window.location.pathname || "/";
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
