import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../../utils/storage";

const initialState = { items: storage.get("ecommerce_cart", []) };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...product, quantity: 1 });
      storage.set("ecommerce_cart", state.items);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      storage.set("ecommerce_cart", state.items);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((product) => product.id === id);
      if (item) item.quantity = Math.max(1, Number(quantity) || 1);
      storage.set("ecommerce_cart", state.items);
    },
    clearCart(state) {
      state.items = [];
      storage.remove("ecommerce_cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;