import { SingleProduct } from "../../components/single-product";

export function SingleProductPage(params) {
  return SingleProduct({ sneakerId: params.id });
}
