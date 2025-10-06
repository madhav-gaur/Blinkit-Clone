import { createSlice } from "@reduxjs/toolkit";

const initialVal = {
  cartSliceData: [],
  cartPaybleAmount: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialVal,
  reducers: {
    setCartSliceData: (state, action) => {
      state.cartSliceData = [...action.payload];
    },
    setCartPaybleAmount: (state, action) => {
      state.cartPaybleAmount = action.payload;
    },
  },
});

export const {
    setCartSliceData,
    setCartPaybleAmount
} = cartSlice.actions;

export default cartSlice.reducer;
