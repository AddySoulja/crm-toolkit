import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientsInfo: JSON.parse(localStorage.getItem("clientsInfo")) || null,
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clientsInfo = action.payload;
      localStorage.removeItem("clientsInfo");
      localStorage.setItem("clientsInfo", JSON.stringify(action.payload));
    },
    removeClients: (state) => {
      state.clientsInfo = null;
      localStorage.removeItem("clientsInfo");
    },
  },
});

export const { setClients, removeClients } = clientsSlice.actions;

export default clientsSlice.reducer;
