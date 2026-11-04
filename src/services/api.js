import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

// Future backend integration:
// Replace fakeBaseQuery with fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL })
// and add endpoints when the backend is ready.
export const api = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Products", "Orders", "Categories"],
  endpoints: () => ({}),
});