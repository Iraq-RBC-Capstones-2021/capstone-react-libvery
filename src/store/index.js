import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import userSlice from "./counter/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice,
  },
});
