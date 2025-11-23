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
      "w-[23.75rem] h-[5rem] flex items-center justify-between mx-auto !mb-[0.5rem]",
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
                className: "text-[1rem] font-500 text-[#757475]",
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
            className: "text-[1rem] font-bold text-[#152536] mt-[0.625rem]",
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
