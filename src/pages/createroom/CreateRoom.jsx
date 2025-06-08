import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CreateRoom = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [files, setFiles] = useState('')
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    des: "",
    roomNumbers: [],
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const { name, price, des, roomNumbers } = formData;

  const handleChange = (e) => {
    setFormData((prev) =>({
        ...prev,
        [e.target.name] : e.target.value
    }))
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files)
  };

  console.log(files)
  return (
    <div className="container">
      <h1 className="heading center">CreateRoom</h1>
      <div className="form-wrapper">
        <form action="">
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
              onChange={handleChange}
              value={roomNumbers}
            ></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="images">Images</label>
            <input
              type="file"
              name="file"
              value={files}
              onChange={handleFileChange}
            />
          </div>
          <button type="submit">Sumbit</button>
        </form>
      </div>
    </div>
  );
};
