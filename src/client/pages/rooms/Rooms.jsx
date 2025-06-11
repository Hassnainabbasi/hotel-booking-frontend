import React, { useEffect, useState } from "react";
import { getRooms } from "../../../admin/feautures/room/roomSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RoomList } from "../../../admin/component/RoomList";

export const Rooms = () => {
  const { rooms = [], isLoading = false } = useSelector(
    (state) => state.room || {}
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  console.log("Rooms data:", rooms);
  console.log("Is loading:", isLoading);

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <img
          className="loader-img"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif "
          alt="Loading..."
        />
      </div>
    );
  }
  return (
    <div>
      <div className="container">
        <h1 className="heading center">Rooms</h1>
        <div className="content-wrapper">
          {rooms.length > 0 ? (
            <RoomList data={rooms} />
          ) : (
            <h1 className="heading center">No Room are Available</h1>
          )}
        </div>
      </div>
    </div>
  );
};
