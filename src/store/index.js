import { configureStore } from "@reduxjs/toolkit";
import addBooksSlice from "./addBooksSlice";
import userSlice from "./counter/userSlice";

export const store = configureStore({
  reducer: {
    addBooks: addBooksSlice,
    user: userSlice,
  },
});
