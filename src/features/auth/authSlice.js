import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../../utils/storage";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: storage.get("ecommerce_user", null), isAuthenticated: !!storage.get("ecommerce_user", null) },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      storage.set("ecommerce_user", action.payload);
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      storage.remove("ecommerce_user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;