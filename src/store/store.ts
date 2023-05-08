import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/products/productsSlices";

export const store = configureStore({
  reducer: {
    productSlice,
  },
});
