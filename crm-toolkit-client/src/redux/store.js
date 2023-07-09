import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./slices/apiSlice";
import authReducer from "./slices/authReducer";
import customersListReducer from "./slices/customersListReducer";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    customers: customersListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
