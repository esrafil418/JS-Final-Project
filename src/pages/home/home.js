import { El } from "../../utils/el";
import {
  HeaderBar,
  SearchBar,
  BrandScroller,
  ProductGrid,
} from "../../components/home";
import { BottomNav } from "../../components/shared/botton-navbar";

export function Home() {
  return El({
    element: "div",
    className: "min-h-screen bg-white pb-20",
    children: [
      El({
        element: "div",
        className: "space-y-6 pb-6",
        children: [HeaderBar(), SearchBar(), BrandScroller(), ProductGrid()],
      }),
      BottomNav(),
    ],
  });
}
