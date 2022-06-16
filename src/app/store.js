import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/AuthSlice";
import adminAuthReducer from "../redux/slices/AdminAuthSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
  },
});
