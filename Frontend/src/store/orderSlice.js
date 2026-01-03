import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderSliceData: [],
  adminOrderSliceData: [],
  allUserSliceData: [],
  isOrderLoaded: false,
  isAdminOrderLoaded: false,
  isAllUserLoaded: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrderSliceData: (state, action) => {
      state.orderSliceData = [...action.payload];
    },
    setAdminOrderSliceData: (state, action) => {
      state.adminOrderSliceData = [...action.payload];
    },
    setAllUserSliceData: (state, action) => {
      state.allUserSliceData = [...action.payload];
    },
    setIsOrderLoaded: (state, action) => {
      state.isOrderLoaded = action.payload;
    },
    setIsAdminOrderLoaded: (state, action) => {
      state.isAdminOrderLoaded = action.payload;
    },
    setIsAllUserLoaded: (state, action) => {
      state.isAllUserLoaded = action.payload;
    },
  },
});

export const {
  setOrderSliceData,
  setIsOrderLoaded,
  setAdminOrderSliceData,
  setIsAdminOrderLoaded,
  setAllUserSliceData,
  setIsAllUserLoaded,
} = orderSlice.actions;
export default orderSlice.reducer;
