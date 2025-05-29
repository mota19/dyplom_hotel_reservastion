import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface IinitialState {
  priceRange: { min: number; max: number };
}

const initialState: IinitialState = {
  priceRange: { min: 0, max: 10000 },
};

const rangeSlice = createSlice({
  name: "range",
  initialState,
  reducers: {
    setPriceRange: (
      state,
      action: PayloadAction<{ min: number; max: number }>,
    ) => {
      state.priceRange = action.payload;
    },
  },
});

export const { setPriceRange } = rangeSlice.actions;
export default rangeSlice.reducer;
