import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import { calculateSubtotal } from "../utils/calculations";

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  return {
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: calculateSubtotal(items),
    add: (product) => dispatch(addToCart(product)),
    remove: (id) => dispatch(removeFromCart(id)),
    update: (payload) => dispatch(updateQuantity(payload)),
    clear: () => dispatch(clearCart()),
  };
};