import { createSlice } from "@reduxjs/toolkit";

const initialVal = {
  address: [],
  isAddressLoaded: false,
  allAddress: [],
  isAllAddressLoaded: false,
  
};

const addressSlice = createSlice({
  name: "address",
  initialState: initialVal,
  reducers: {
    setAddressSlice: (state, action) => {
      state.address = [...action.payload];
      state.isAddressLoaded = true;
    },
    setIsAddressLoaded: (state, action) => {
      state.isAddressLoaded = action.payload;
    },
    setAllAddressSlice: (state, action) => {
      state.allAddress = [...action.payload];
      state.isAllAddressLoaded = true;
    },
    setIsAllAddressLoaded: (state, action) => {
      state.isAllAddressLoaded = action.payload;
    },
  },
});

export const { setAddressSlice, setIsAddressLoaded, setAllAddressSlice, setIsAllAddressLoaded } = addressSlice.actions;
export default addressSlice.reducer;
