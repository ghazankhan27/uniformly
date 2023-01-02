import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import adminAuthReducer from "./slices/AdminAuthSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
  },
});
