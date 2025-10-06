import { createSlice } from "@reduxjs/toolkit";

const initialVal = {
  allCategory: [],
  subCategory: [],
  loadingCategory: false,
  loadingProduct: false,
  product: [],
};

const productSlice = createSlice({
  name: "user",
  initialState: initialVal,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = [...action.payload];
    },
    setLoadingCategory: (state, action) => {
      state.loadingCategory = action.payload;
    },
    setSubCategory: (state, action) => {
      state.subCategory = [...action.payload];
    },
    setLoadingProduct: (state, action) => {
      state.loadingProduct = action.payload;
    },
    setProduct: (state, action) => {
      state.product = [...action.payload];
    },
  },
});

export const {
  setAllCategory,
  setLoadingCategory,
  setSubCategory,
  setProduct,
  setLoadingProduct
} = productSlice.actions;

export default productSlice.reducer;
