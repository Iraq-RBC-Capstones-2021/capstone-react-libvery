import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
};

const addBooksSlice = createSlice({
  name: "addBooks",
  initialState,
  reducers: {
    addBooks: (state, action) => {
      state.books.push(action.payload);
    },
    emptyBooks: (state) => {
      state.books = [];
    },
    searchBooks: (state, action) => {
      state.books.push(action.payload);
    },
  },
});

export const { addBooks, emptyBooks, searchBooks } = addBooksSlice.actions;
export default addBooksSlice.reducer;
