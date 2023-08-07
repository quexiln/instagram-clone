import { createSlice } from "@reduxjs/toolkit";

export const userInformations = createSlice({
  name: "user",
  initialState: {
    id: localStorage.getItem("userId"),
  },
  reducers: {
    setLoginId: (state, action) => {
      state.id = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    resetId: (state) => {
      state.id = "";
      localStorage.setItem("userId", "");
    },
  },
});

export const {
  setLoginId,
  resetId,
} = userInformations.actions;

export default userInformations.reducer;
