import { configureStore } from "@reduxjs/toolkit";
import addBooksSlice from "./addBooksSlice";

export const store = configureStore({
  reducer: {
    addBooks: addBooksSlice,
  },
});
