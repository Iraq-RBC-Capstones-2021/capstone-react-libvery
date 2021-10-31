import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./books/booksSlice";
import userSlice from "./users/userSlice";

export const store = configureStore({
  reducer: {
    books: booksSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
