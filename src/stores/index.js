import { configureStore } from "@reduxjs/toolkit";
import userInformations from "./userInformations";

const store = configureStore({
  reducer: {
    userInformations: userInformations,
  },
});

export default store;
