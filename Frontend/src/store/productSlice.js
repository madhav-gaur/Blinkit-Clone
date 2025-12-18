import { createSlice } from "@reduxjs/toolkit";

const initialVal = {
  allCategory: [],
  subCategory: [],
  loadingCategory: false,
  loadingProduct: false,
  product: [],
  isLoaded: false,
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
    setIsLoaded: (state, action) => {
      state.isLoaded = action.payload;
    },
  },
});

export const {
  setAllCategory,
  setLoadingCategory,
  setSubCategory,
  setProduct,
  setLoadingProduct,
  setIsLoaded,
} = productSlice.actions;

export default productSlice.reducer;
