import { configureStore } from "@reduxjs/toolkit";
import product from "./slice/product";
export const store = configureStore({
  reducer: {
    product
  },
});
