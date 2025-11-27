import { El } from "../../../utils/el";

export function FormTitle(title) {
  return El({
    element: "h1",
    innerText: title,
    className:
      "mt-[6.875rem] text-[#152536] text-center text-[2rem] font-[600] w-[21.375rem]",
  });
}
