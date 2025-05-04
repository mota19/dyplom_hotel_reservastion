import { createSlice } from "@reduxjs/toolkit";
import { BookingSearchArray } from "@/types/supabaseTypes";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: BookingSearchArray = [{ city: "" }];

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    allBookingSearch(state, action: PayloadAction<BookingSearchArray | null>) {
      return action.payload ?? [];
    },
  },
});

export const { allBookingSearch } = bookingSlice.actions;
export default bookingSlice.reducer;
