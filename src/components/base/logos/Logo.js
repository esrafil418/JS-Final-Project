import { El } from "../../../utils/el";
import { ICONS } from "../../../constants/icons";

export function Logo() {
  return El({
    element: "img",
    src: ICONS.LOGO,
    className:
      "color-black mt-[8.25rem] w-[3.375rem] h-[5.0625rem] object-cover",
  });
}
