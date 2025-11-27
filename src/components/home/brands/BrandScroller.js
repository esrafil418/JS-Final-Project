import { El } from "../../../utils/el";
import { getBrands } from "../../../api";
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

  function capitalize(str) {
    const val = String(str).toLowerCase();
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  let swiper;

  function createBrandSlide(label) {
    const isSelected = label === selected;

    const slide = El({
      element: "div",
      className: `swiper-slide !w-auto !inline-block`,
      children: [
        El({
          element: "button",
          innerText: capitalize(label),
          className: `px-4 py-[0.310rem] rounded-[1.5625rem] text-[1rem] font-[600] text-[#343A40] whitespace-nowrap ${
            isSelected
              ? "bg-[#343A40] text-white border border-2 border-[#343A40]"
              : "bg-white border border-2 border-[#343A40]"
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
