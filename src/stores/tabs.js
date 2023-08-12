import { createSlice } from "@reduxjs/toolkit";

export const tabs = createSlice({
  name: "tabs",
  initialState: {
    createTab:false
  },
  reducers: {
    openCreateTab: (state) => {
      state.createTab =true;
    },
    closeCreateTab: (state) => {
      state.createTab = false;
    },
  },
});

export const {
  openCreateTab,
  closeCreateTab
} = tabs.actions;

export default tabs.reducer;
