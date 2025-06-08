import { configureStore } from "@reduxjs/toolkit";
import authReducer from './feautures/auth/authSlice'
import roomReducer from "./feautures/room/roomSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer
  },
});
