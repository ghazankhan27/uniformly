import { createSlice } from "@reduxjs/toolkit";

export const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    authorized: false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.authorized = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setName } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
