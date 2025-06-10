import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "./index.styles.scss";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Header from './component/Header'
import Dashboard from './pages/dashboard/Dashboard';
import { CreateRoom } from './pages/createroom/CreateRoom';
import { Rooms } from './pages/rooms/Rooms';
import { Room } from './pages/room/Room';
import { EditRoom } from './pages/editroom/EditRoom';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/all/:id" element={<Room />} />
        <Route path="/rooms/edit/:id" element={<EditRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
