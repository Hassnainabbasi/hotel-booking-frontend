import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.styles.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./admin/pages/dashboard/Dashboard";
import { EditRoom } from "./admin/pages/editroom/EditRoom";
import Register from "./pages/register/Register";
import { CreateRoom } from "./admin/pages/createroom/CreateRoom";
import Login from "./pages/login/Login";
import { Rooms } from "./admin/pages/rooms/Rooms";
import { Room } from "./admin/pages/room/Room";
import Header from "./admin/component/Header";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProctectedRoute";
import UserOnlyRoute from "./UserOnlyRoutes";
import Home from "./admin/pages/home/Home";
import ClientHome from "./client/pages/home/ClientHome";
import { RoomUser } from "./client/pages/room/RoomUser";
import { Booking } from "./client/pages/booking/Booking";
import { Success } from "./client/pages/success/Success";
import { Bookings } from "./admin/pages/booking/Bookings";

function App() {
  const { user } = useSelector((state) => state.auth);
  console.log(user, "=>User Check");

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={user?.isAdmin ? <Home /> : <ClientHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-room"
          element={
            <ProtectedRoute>
              <CreateRoom />
            </ProtectedRoute>
          }
        />
        <Route path="/rooms" element={<Rooms />} />
        <Route
          path="/rooms/all/:id"
          element={user?.isAdmin ? <Room /> : <RoomUser />}
        />
        <Route
          path="/rooms/edit/:id"
          element={
            <ProtectedRoute>
              <EditRoom />
            </ProtectedRoute>
          }
        />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/bookings/:id" element={<Bookings />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
