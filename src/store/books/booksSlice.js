import { getDocs, collection, doc, deleteDoc } from "@firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";

const initialState = {
  status: "idle",
  books: [],
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const querySnapshot = await getDocs(collection(db, "books"));

  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
});
export const fetchUserBooks = createAsyncThunk(
  "books/fetchUserBooks",
  async (uid) => {
    const querySnapshot = await getDocs(collection(db, "books"));

    let data = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === uid) {
        data.push(doc.data());
      }
    });
    return data;
  }
);
export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  try {
    await deleteDoc(doc(db, "books", id));
  } catch (error) {
    console.log(
      "🚀 ~ file: booksSlice.js ~ line 37 ~ deleteBook ~ error",
      error
    );
  }
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBooks: (state, action) => {
      state.books.push(action.payload);
    },
    emptyBooks: (state) => {
      state.books = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      })
      .addCase(fetchUserBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      })
      .addCase(deleteBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBook.fulfilled, (state) => {
        state.status = "idle";
      });
  },
});

export const { addBooks, emptyBooks, searchBooks } = booksSlice.actions;
export default booksSlice.reducer;
