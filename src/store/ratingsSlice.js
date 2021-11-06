import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalRaters: 0,
  totalRating: 0,
  rating: 0,
  ratersUID: [],
};

const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    setRatings: (state, action) => {
      state.totalRaters = action.payload.totalRaters;
      state.totalRating = action.payload.totalRating;
      state.rating = action.payload.rating;
      state.ratersUID = action.payload.ratersUID;
    },
  },
});

export const { setRatings } = ratingsSlice.actions;
export default ratingsSlice.reducer;
