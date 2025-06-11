import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./admin/feautures/auth/authSlice";
import roomReducer from "./admin/feautures/room/roomSlice";
import  bookingReducer from "./client/feautures/booking/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
    booking: bookingReducer,
  },
});
