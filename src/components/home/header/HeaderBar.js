import { El } from "../../../utils/el";
import { ICONS } from "../../../constants/icons";
import { authHelper } from "../../../utils/auth";
import { getGreeting } from "../../../utils/time";

export function HeaderBar() {
  // authHelper
  const getUserName = () => {
    return authHelper.getUsername();
  };

  return El({
    element: "div",
    className:
      "w-[23.75rem] h-20 flex items-center justify-between px-4 mx-auto",
    children: [
      //! Left section: Greeting and username
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
                src: ICONS.HAND_EMOJI,
                className: "w-4 h-4 ml-1",
              }),
            ],
          }),
          //? Username display
          El({
            element: "div",
            innerText: getUserName(),
            className: "text-base font-bold text-[#152536] mt-2",
          }),
        ],
      }),

      //! Right section: Action icons
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
