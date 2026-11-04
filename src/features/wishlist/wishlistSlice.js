import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../../utils/storage";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: storage.get("ecommerce_wishlist", []) },
  reducers: {
    toggleWishlist(state, action) {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);
      state.items = exists
        ? state.items.filter((item) => item.id !== product.id)
        : [...state.items, product];
      storage.set("ecommerce_wishlist", state.items);
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;