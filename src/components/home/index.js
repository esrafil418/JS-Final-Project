// Re-export individual components for named imports
export { HeaderBar } from "./header/HeaderBar";
export { SearchBar } from "./search/SearchBar";
export { BrandScroller } from "./brands/BrandScroller";
export { ProductGrid } from "./product-grid/ProductGrid";

export function HomeComponents() {
  return {
    HeaderBar,
    SearchBar,
    BrandScroller,
    ProductGrid,
  };
}
