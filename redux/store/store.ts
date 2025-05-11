import { configureStore } from "@reduxjs/toolkit";
import BookingReducer from "@/redux/slices/bookingSlice";
import infoReducer from "@/redux/slices/infoAboutBooking";
import userProviderReducer from "@/redux/slices/userProviderSlice";
import filterReducer from "@/redux/slices/filterSlice";

export const store = configureStore({
  reducer: {
    booking: BookingReducer,
    info: infoReducer,
    userProvider: userProviderReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
