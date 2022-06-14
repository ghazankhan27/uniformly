import { createSlice } from "@reduxjs/toolkit";

const auth = localStorage.getItem("token") ? true : false;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authorized: auth,
    name: "",
  },
  reducers: {
    setAuth: (state, action) => {
      state.authorized = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setName } = authSlice.actions;

export default authSlice.reducer;
