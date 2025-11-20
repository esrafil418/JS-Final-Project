import { SingleProduct } from "../../components/single-product";

export function SingleProductPage(params) {
  return SingleProduct({ productId: params.id });
}
