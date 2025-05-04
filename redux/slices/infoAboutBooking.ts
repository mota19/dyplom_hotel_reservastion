import { createSlice } from "@reduxjs/toolkit";
import { infoAboutBookingProp } from "@/types/supabaseTypes";
import { PayloadAction } from "@reduxjs/toolkit";
const initialState: infoAboutBookingProp = {
  destination: "",
  inDate: "",
  outDate: "",
  numberOfGuest: 0,
};

const infoAboutBooking = createSlice({
  name: "info",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.destination = action.payload;
    },
    setInDate(state, action: PayloadAction<string>) {
      state.inDate = action.payload;
    },
    setOut(state, action: PayloadAction<string>) {
      state.outDate = action.payload;
    },
    setNumberOfGuests(state, action: PayloadAction<number>) {
      state.numberOfGuest = action.payload;
    },
  },
});

export const { setCity, setInDate, setOut, setNumberOfGuests } =
  infoAboutBooking.actions;
export default infoAboutBooking.reducer;
