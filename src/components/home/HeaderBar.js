import { El } from "../../utils/el";
import { ICONS } from "../../constants/icons";

export function HeaderBar() {
  /**
   * Determines appropriate greeting based on current time of day
   * @returns {string} "Good Morning" or "Good Evening"
   */
  const getGreeting = () => {
    const hour = new Date().getHours();
    return hour < 12 ? "Good Morning" : "Good Evening";
  };

  /**
   * Retrieves username from browser's local storage
   * @returns {string} The stored username
   */
  const getUserName = () => {
    return localStorage.getItem("username");
  };

  // Create the main header bar container
  return El({
    element: "div",
    // Fixed width and centered with flex layout
    className:
      "w-[23.75rem] h-20 flex items-center justify-between px-4 mx-auto",
    children: [
      // Left section: Greeting and username
      El({
        element: "div",
        children: [
          // Greeting with waving hand emoji
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
                src: "/images/👋.png", // Waving hand emoji image
                className: "w-4 h-4 ml-1",
              }),
            ],
          }),
          // Username display
          El({
            element: "div",
            innerText: getUserName(),
            className: "text-base font-bold text-[#152536] mt-2",
          }),
        ],
      }),

      // Right section: Action icons
      El({
        element: "div",
        className: "flex items-center gap-4",
        children: [
          createIconButton(ICONS.BELL, "Notifications"), // Notifications bell icon
          createIconButton(ICONS.HEART, "Favorites"), // Favorites heart icon
        ],
      }),
    ],
  });
}

/**
 * Creates a clickable icon button
 * @param {string} icon - Path/URL to the icon image
 * @param {string} alt - Alt text for accessibility
 * @returns {HTMLElement} The icon button element
 */
function createIconButton(icon, alt) {
  return El({
    element: "img",
    src: icon,
    alt, // Accessibility description
    className: "w-6 h-6 cursor-pointer hover:scale-105 transition-transform",
  });
}
