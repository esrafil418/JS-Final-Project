import { El } from "../../../utils/el";
import { getProducts, getBrands } from "../../../api";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export function BrandScroller() {
  let brands = [];
  let selected = "ALL";

  const container = El({
    element: "div",
    className: "w-full px-4",
    children: [],
  });

  const swiperContainer = El({
    element: "div",
    className: "swiper brand-swiper",
    children: [
      El({
        element: "div",
        className: "swiper-wrapper",
        children: [],
      }),
    ],
  });

  container.appendChild(swiperContainer);

  let swiper;

  function createBrandSlide(label) {
    const isSelected = label === selected;

    const slide = El({
      element: "div",
      className: `swiper-slide !w-auto !inline-block`,
      children: [
        El({
          element: "button",
          innerText: label,
          className: `px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all ${
            isSelected
              ? "bg-black text-white shadow-sm"
              : "bg-white border border-gray-200 text-gray-700 hover:scale-105 hover:border-gray-300"
          }`,
          eventListener: [
            {
              event: "click",
              callback: () => handleBrandSelect(label),
            },
          ],
        }),
      ],
    });

    return slide;
  }

  async function handleBrandSelect(label) {
    if (selected === label) return;
    selected = label;
    renderBrands();

    const brandParam = label === "ALL" ? "" : label;

    try {
      window.dispatchEvent(
        new CustomEvent("brandChange", {
          detail: { brand: brandParam },
        })
      );
    } catch (err) {
      console.error("Failed to load products for brand:", brandParam, err);
    }
  }

  function renderBrands() {
    const wrapper = swiperContainer.querySelector(".swiper-wrapper");
    wrapper.innerHTML = "";

    wrapper.appendChild(createBrandSlide("ALL"));

    brands.forEach((brand) => {
      wrapper.appendChild(createBrandSlide(brand));
    });

    if (!swiper) {
      swiper = new Swiper(swiperContainer, {
        slidesPerView: "auto",
        spaceBetween: 6,
        freeMode: true,
      });
    } else {
      swiper.update();
    }
  }

  async function loadBrands() {
    try {
      const res = await getBrands();
      if (Array.isArray(res)) brands = res;
      else if (Array.isArray(res.data)) brands = res.data;
      else brands = [];

      renderBrands();
    } catch (err) {
      console.error("Failed to load brands:", err);
    }
  }

  loadBrands();

  return container;
}
