import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderSliceData: [],
  isOrderLoaded: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrderSliceData: (state, action) => {
      state.orderSliceData = [...action.payload];
    },
    setIsOrderLoaded: (state, action) => {
      state.isOrderLoaded = action.payload;
    },
  },
});

export const { setOrderSliceData, setIsOrderLoaded } = orderSlice.actions;
export default orderSlice.reducer;
