import { createSlice } from "@reduxjs/toolkit";

const initialState = { dropdown: "All" };

const dropdownSlice = createSlice({
  name: "dropdownSlice",
  initialState,
  reducers: {
    changeDropdown: (state, action) => {
      state.dropdown = action.payload;
    },
  },
});

export const { changeDropdown } = dropdownSlice.actions;
export default dropdownSlice.reducer;
