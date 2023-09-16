import { createSlice } from "@reduxjs/toolkit";

export const tabs = createSlice({
  name: "tabs",
  initialState: {
    lastTab: localStorage.getItem("lastTab"),
    createTab: false,
    postTab: false,
  },
  reducers: {
    setLastTab: (state, action) => {
      state.lastTab = action.payload;
      localStorage.setItem("lastTab",action.payload);
    },
    openCreateTab: (state) => {
      state.createTab = true;
    },
    closeCreateTab: (state) => {
      state.createTab = false;
    },
    openPost: (state, action) => {
      state.postTab = true;
    },
    closePost: (state) => {
      state.postTab = false;
    },
  },
});

export const {
  openCreateTab,
  closeCreateTab,
  openPost,
  closePost,
  setLastTab,
} = tabs.actions;

export default tabs.reducer;
