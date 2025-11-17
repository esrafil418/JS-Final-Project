import { El } from "../utils/el";
import { router } from "../utils/router";
import { store } from "../utils/store";

export function HeaderBar() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : "Good Evening";

  // read user name
  const userState = store.getState("user");
  const username =
    (userState && (userState.username || userState.user?.username)) || "Guest";

  const container = El({
    element: "div",
    className:
      "w-[26.75rem] h-[5rem] flex items-center justify-between px-[1rem] box-border",
    children: [
      El({
        element: "div",
        className: "flex flex-col",
        children: [
          El({
            element: "span",
            innerText: greeting,
            className: "text-[1rem]",
          }),
          El({
            element: "div",
            innerText: username,
            className: "text-[0.875rem] text-[#6b7280] mt-1",
          }),
        ],
      }),
      El({
        element: "div",
        className: "flex items-center gap-[1rem]",
        children: [
          El({
            element: "img",
            src: "/public/icons/heart.svg",
            alt: "favorites",
            className:
              "w-[1.25rem] h-[1.25rem] cursor-pointer transition-all duration-200 hover:scale-105",
            onclick: () => router.navigate("/favorites"),
          }),
          El({
            element: "img",
            src: "/public/icons/bell.svg",
            alt: "notifications",
            className:
              "w-[1.25rem] h-[1.25rem] cursor-pointer transition-all duration-200 hover:scale-105",
            onclick: () => router.navigate("/notifications"),
          }),
        ],
      }),
    ],
  });
  return container;
}
