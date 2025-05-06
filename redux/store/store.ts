import { configureStore } from "@reduxjs/toolkit";
import BookingReducer from "@/redux/slices/bookingSlice";
import infoReducer from "@/redux/slices/infoAboutBooking";
import userProviderReducer from "@/redux/slices/userProviderSlice";

export const store = configureStore({
  reducer: {
    booking: BookingReducer,
    info: infoReducer,
    userProvider: userProviderReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
