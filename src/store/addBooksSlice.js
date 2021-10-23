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
  },
});

export const { addBooks, emptyBooks } = addBooksSlice.actions;
export default addBooksSlice.reducer;
