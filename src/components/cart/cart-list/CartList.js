import { El } from "../../../utils/el";
import { CartItem } from "../cart-item/CartItem";
import { EmptyCart } from "../empty-cart/EmptyCart";

export function CartList({ cartItems, onRemoveItem, onUpdateQuantity }) {
  if (!cartItems || cartItems.length === 0) {
    return EmptyCart();
  }

  return El({
    element: "div",
    className: "p-4 pb-32",
    children: cartItems.map((item, index) =>
      CartItem({
        item,
        onRemove: () => onRemoveItem(index),
        onQuantityChange: (newQuantity) => onUpdateQuantity(index, newQuantity),
      })
    ),
  });
}
