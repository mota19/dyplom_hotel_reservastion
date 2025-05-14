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
    sortByPrice(state, action: PayloadAction<"asc" | "desc">) {
      return [...state].sort((a, b) => {
        const aPrice = a.pricePerNight ?? 0;
        const bPrice = b.pricePerNight ?? 0;

        return action.payload === "asc" ? aPrice - bPrice : bPrice - aPrice;
      });
    },
    sortByRating(state, action: PayloadAction<"asc" | "desc">) {
      return [...state].sort((a, b) => {
        const astar_rating = a.star_rating ?? 0;
        const bstar_rating = b.star_rating ?? 0;

        return action.payload === "asc"
          ? astar_rating - bstar_rating
          : bstar_rating - astar_rating;
      });
    },
  },
});

export const { allBookingSearch, sortByPrice, sortByRating } =
  bookingSlice.actions;
export default bookingSlice.reducer;
