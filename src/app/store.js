import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/AuthSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
