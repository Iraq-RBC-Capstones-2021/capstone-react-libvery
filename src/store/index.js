import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./books/bookSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});
