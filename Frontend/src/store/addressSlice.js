import { createSlice } from "@reduxjs/toolkit";

const initialVal = {
  address: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState: initialVal,
  reducers: {
    setAddressSlice: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setAddressSlice } = addressSlice.actions;

export default addressSlice.reducer;
