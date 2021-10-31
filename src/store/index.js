import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./books/booksSlice";
import userSlice from "./users/userSlice";
import dropdownSlice from "./dropdownSlice";

export const store = configureStore({
  reducer: {
    books: booksSlice,
    user: userSlice,
    dropdown: dropdownSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
