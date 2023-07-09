import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: JSON.parse(localStorage.getItem("customersList")) || null,
};

const customersListSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.list = action.payload;
      localStorage.removeItem("customersList");
      localStorage.setItem("customersList", JSON.stringify(action.payload));
    },
  },
});

export const { setCustomers } = customersListSlice.actions;

export default customersListSlice.reducer;
