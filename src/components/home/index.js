// Re-export individual components for named imports
export { HeaderBar } from "./header/HeaderBar";
export { SearchBar } from "./search/SearchBar";
export { BrandScroller } from "./brands/BrandScroller";
export { ProductGrid } from "./product-grid/ProductGrid";
export { MostPopular } from "./most-popular/MostPopular";

export function HomeComponents() {
  return {
    HeaderBar,
    SearchBar,
    MostPopular,
    BrandScroller,
    ProductGrid,
  };
}
