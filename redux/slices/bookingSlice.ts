import { createSlice } from "@reduxjs/toolkit";
import { Accomodation } from "@/types/supabaseTypes";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: Accomodation[] = [];

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    allBookingSearch(state, action: PayloadAction<Accomodation[] | null>) {
      return action.payload ?? [];
    },
  },
});

export const { allBookingSearch } = bookingSlice.actions;
export default bookingSlice.reducer;
