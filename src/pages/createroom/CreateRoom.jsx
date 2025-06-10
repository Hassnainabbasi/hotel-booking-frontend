import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRoom, reset } from "../../feautures/room/roomSlice";

export const CreateRoom = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [files, setFiles] = useState("");
  const { isSuccess } = useSelector((state) => state.room);
  const { rooms } = useSelector((state) => state.room);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    des: "",
    roomNumbers: "401, 203, 232, 234",
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const { name, price, des, roomNumbers } = formData;
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !roomNumbers) {
      return;
    }

    const roomArray = roomNumbers.split(",").map((item) => {
      return {
        number: parseInt(item),
        unavailableDate: [],
      };
    });
    console.log(roomArray);

    let imageUrl = [];
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const info = new FormData();
        info.append("file", files[i]);
        info.append("upload_preset", "Hotel Booking");
        info.append("cloud_name", "djmfadch8");

        try {
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/djmfadch8/image/upload",
            {
              method: "POST",
              body: info,
            }
          );

          if (!res.ok) {
            const error = await res.json();
            console.error("Error uploading image:", error);
            return;
          }

          const imageData = await res.json();
          imageUrl.push(imageData.secure_url);

          console.log(imageUrl);
        } catch (error) {
          console.log(error);
        }
      }
    }

    const dataToSubmit = {
      name,
      price,
      des,
      roomNumbers: roomArray,
      img: imageUrl,
    };

    console.log(dataToSubmit);
    dispatch(createRoom(dataToSubmit));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/dashboard");
    }
  }, [isSuccess, dispatch, navigate]);

  return (
    <div className="container">
      <h1 className="heading center">CreateRoom</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter room name"
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
          <div className="input-group">
            <label htmlFor="images">Images</label>
            <input type="file" name="file" onChange={handleFileChange} />
          </div>
          <button type="submit">Sumbit</button>
        </form>
      </div>
    </div>
  );
};
