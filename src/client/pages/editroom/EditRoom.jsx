import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { reset, updateRoom } from "../../../admin/feautures/room/roomSlice"
import BASE_URL from "../../../../constant";

export const EditRoom = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    des: "",
    roomNumbers: [],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess } = useSelector((state) => state.room);
  const { user } = useSelector((state) => state.auth);

  const { name, price, des, roomNumbers } = formData;
  const { id } = useParams();

  useEffect(() => {
    dispatch(reset());
    const getRooms = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/rooms/${id}`, {
          method: "GET",
        });
        const data = await res.json();
        const { roomNumbers, ...rest } = data;
        const roomMap = roomNumbers.map((item) => item.number);
        const roomString = roomMap.join(",");

        console.log(data);
        setFormData({
          ...rest,
          roomNumbers: roomString,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getRooms();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !price || !roomNumbers) {
        return;
      }

      const roomArray = roomNumbers.split(",").map((item) => {
        return {
          number: parseInt(item),
          unavailableDate: [],
        };
      });

      const dataToSubmit = {
        name,
        price,
        des,
        roomNumbers: roomArray,
        roomId: id,
      };
      console.log(dataToSubmit);
      const result = await dispatch(updateRoom(dataToSubmit));
      if (updateRoom.fulfilled.match(result)) {
        navigate("/dashboard");
      } else {
        throw new Error(result.error?.message || "Failed to update room");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="container">
      <h1 className="heading center">Edit Room</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Price</label>
            <input
              type="text"
              name="price"
              value={price}
              placeholder="Enter Price"
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="des">Description</label>
            <textarea name="des" onChange={handleChange} value={des}></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="roomNumbers">Room Number</label>
            <textarea
              name="roomNumbers"
              placeholder="Enter room numbers seprated by commas eg: 202, 203, 204, 400"
              onChange={handleChange}
              value={roomNumbers}
            ></textarea>
          </div>
          <button type="submit">Sumbit</button>
        </form>
      </div>
    </div>
  );
};
