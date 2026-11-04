import { createSlice } from "@reduxjs/toolkit";
import { brands as initialBrands } from "../../data/brands";
import { storage } from "../../utils/storage";

const brandsSlice = createSlice({
  name: "brands",
  initialState: { items: storage.get("ecommerce_brands", initialBrands) },
  reducers: {
    addBrand(state, action) {
      state.items.unshift({ ...action.payload, id: Date.now() });
      storage.set("ecommerce_brands", state.items);
    },
    updateBrand(state, action) {
      const index = state.items.findIndex((item) => item.id === Number(action.payload.id));
      if (index !== -1) state.items[index] = { ...state.items[index], ...action.payload };
      storage.set("ecommerce_brands", state.items);
    },
    deleteBrand(state, action) {
      state.items = state.items.filter((item) => item.id !== Number(action.payload));
      storage.set("ecommerce_brands", state.items);
    },
  },
});

export const { addBrand, updateBrand, deleteBrand } = brandsSlice.actions;
export default brandsSlice.reducer;