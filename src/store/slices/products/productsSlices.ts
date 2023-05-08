import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addActiveProducts: (state, { payload }: PayloadAction<number>) => {
      state.activeProducts = payload + 1;
    },
    addCart: (state, { payload }) => {
      state.cart =
        state?.cart?.length === 0
          ? state.products.map((e) => {   
              if (+e.id === payload.activeProducts) {
                return {
                  ...e,
                  count: payload.countProducts,
                };
              }
              return e;
            })
          : state.cart.map((e) => {
              if (+e.id === payload.activeProducts) {
                return {
                  ...e,
                  count: (e.count && +e.count) + payload.countProducts,
                };
              }
              return e;
            });
    },
    addInformationData: (state, { payload }) => {
      state.information = payload;
    },
  },
});

export const { addActiveProducts, addCart, addInformationData } = productSlice.actions;
export default productSlice.reducer;
