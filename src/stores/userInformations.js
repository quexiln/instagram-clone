import { createSlice } from "@reduxjs/toolkit";

export const userInformations = createSlice({
  name: "user",
  initialState: {
    id: localStorage.getItem("userId"),
    username : localStorage.getItem("username")
  },
  reducers: {
    setLoginId: (state, action) => {
      state.id = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    setMyUsername: (state, action) => {
      state.username = action.payload;
      localStorage.setItem("username", action.payload);
    },
    resetInformations: (state) => {
      state.id = "";
      state.username = "";
      localStorage.setItem("userId", "");
      localStorage.setItem("username", "");
    },
  },
});

export const {
  setLoginId,
  setMyUsername,
  resetInformations,
} = userInformations.actions;

export default userInformations.reducer;
