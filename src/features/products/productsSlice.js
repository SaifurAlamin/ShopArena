import { createSlice } from "@reduxjs/toolkit";
import { products as initialProducts } from "../../data/products";
import { storage } from "../../utils/storage";

const productsSlice = createSlice({
  name: "products",
  initialState: { items: storage.get("ecommerce_products", initialProducts) },
  reducers: {
    addProduct(state, action) {
      state.items.unshift({ ...action.payload, id: Date.now() });
      storage.set("ecommerce_products", state.items);
    },
    updateProduct(state, action) {
      const index = state.items.findIndex((item) => item.id === Number(action.payload.id));
      if (index !== -1) state.items[index] = { ...state.items[index], ...action.payload };
      storage.set("ecommerce_products", state.items);
    },
    deleteProduct(state, action) {
      state.items = state.items.filter((item) => item.id !== Number(action.payload));
      storage.set("ecommerce_products", state.items);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;