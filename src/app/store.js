import { configureStore } from "@reduxjs/toolkit";
import UserData from "../features/UserData";

export const store = configureStore({
  reducer: {
    app: UserData,
  },
});
