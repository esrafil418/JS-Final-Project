// Re-export individual components for named imports
export { HeaderBar } from "./HeaderBar";
export { SearchBar } from "./SearchBar";
export { BrandScroller } from "./BrandScroller";
export { ProductGrid } from "./ProductGrid";

export function HomeComponents() {
  return {
    HeaderBar,
    SearchBar,
    BrandScroller,
    ProductGrid,
  };
}
