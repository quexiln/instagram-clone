import { configureStore } from "@reduxjs/toolkit";
import userInformations from "./userInformations";
import tabs from "./tabs";

const store = configureStore({
  reducer: {
    userInformations: userInformations,
    tabs:tabs,
  },
});

export default store;
