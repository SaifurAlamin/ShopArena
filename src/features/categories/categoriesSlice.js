import { createSlice } from "@reduxjs/toolkit";
import { categories as initialCategories } from "../../data/categories";
import { storage } from "../../utils/storage";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { items: storage.get("ecommerce_categories", initialCategories) },
  reducers: {
    addCategory(state, action) {
      state.items.unshift({ ...action.payload, id: Date.now() });
      storage.set("ecommerce_categories", state.items);
    },
    updateCategory(state, action) {
      const index = state.items.findIndex((item) => item.id === Number(action.payload.id));
      if (index !== -1) state.items[index] = { ...state.items[index], ...action.payload };
      storage.set("ecommerce_categories", state.items);
    },
    deleteCategory(state, action) {
      state.items = state.items.filter((item) => item.id !== Number(action.payload));
      storage.set("ecommerce_categories", state.items);
    },
  },
});

export const { addCategory, updateCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;