import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./slices/apiSlice";
import authReducer from "./slices/authReducer";
import clientReducer from "./slices/clientReducer";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    clients: clientReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
