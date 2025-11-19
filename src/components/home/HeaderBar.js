import { El } from "../../utils/el";
import { store } from "../../utils/store";
import { ICONS } from "../../constants/icons";

export function HeaderBar() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    return hour < 12 ? "Good Morning" : "Good Evening";
  };

  const getUserName = () => {
    return localStorage.getItem("username");
  };

  return El({
    element: "div",
    className: "w-[23.75rem] h-20 flex items-center justify-between px-4",
    children: [
      // Greeting & Username
      El({
        element: "div",
        children: [
          El({
            element: "div",
            className: "flex items-center",
            children: [
              El({
                element: "span",
                innerText: getGreeting(),
                className: "text-base font-medium",
              }),
              El({
                element: "img",
                src: "/images/👋.png",
                className: "w-4 h-4 ml-1",
              }),
            ],
          }),
          El({
            element: "div",
            innerText: getUserName(),
            className: "text-base font-bold text-[#152536] mt-2",
          }),
        ],
      }),
      // Icons
      El({
        element: "div",
        className: "flex items-center gap-4",
        children: [
          createIconButton(ICONS.BELL, "Notifications"),
          createIconButton(ICONS.HEART, "Favorites"),
        ],
      }),
    ],
  });
}

function createIconButton(icon, alt) {
  return El({
    element: "img",
    src: icon,
    alt,
    className: "w-6 h-6 cursor-pointer hover:scale-105 transition-transform",
  });
}
