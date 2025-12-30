import { createSlice } from "@reduxjs/toolkit";

const initialVal = {
  allCategory: [],
  subCategory: [],
  loadingCategory: false,
  isLoadedCategory: false,
  isLoadedSubCategory: false,
  loadingProduct: false,
  product: [],
  allProduct: [],
  isLoaded: false,
};

const productSlice = createSlice({
  name: "user",
  initialState: initialVal,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = [...action.payload];
      state.isLoadedCategory = true;
    },
    setLoadingCategory: (state, action) => {
      state.loadingCategory = action.payload;
    },
    setIsLoadedCategory: (state, action) => {
      state.isLoadedCategory = action.payload;
    },
    setSubCategory: (state, action) => {
      state.subCategory = [...action.payload];
      state.isLoadedSubCategory = true;
    },
    setIsLoadedSubCategory: (state, action) => {
      state.isLoadedSubCategory = action.payload;
    },
    setLoadingProduct: (state, action) => {
      state.loadingProduct = action.payload;
    },
    setProduct: (state, action) => {
      state.product = [...action.payload];
    },
    setAllProduct: (state, action) => {
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
  setIsLoadedCategory,
  setIsLoadedSubCategory,
  setSubCategory,
  setProduct,
  setAllProduct,
  setLoadingProduct,
  setIsLoaded,
} = productSlice.actions;

export default productSlice.reducer;
