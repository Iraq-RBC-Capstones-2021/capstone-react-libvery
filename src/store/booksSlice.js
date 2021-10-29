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
  },
});

export const { addBooks, emptyBooks, searchBooks } = booksSlice.actions;
export default booksSlice.reducer;
