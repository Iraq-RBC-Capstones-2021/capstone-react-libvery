import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
};

const booksSlice = createSlice({
  name: "booksSlice",
  initialState,
  reducers: {
    addBooks: (state, action) => {
      state.books.push(action.payload);
    },
    emptyBooks: (state) => {
      state.books = [];
    },
    fetchBooks: (state, action) => {
      state.books = action.payload;
    },
  },
});

export const { addBooks, emptyBooks, fetchBooks } = booksSlice.actions;
export default booksSlice.reducer;
