import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./booksSlice";
import userSlice from "./counter/userSlice";

export const store = configureStore({
  reducer: {
    books: booksSlice,
    user: userSlice,
  },
});
