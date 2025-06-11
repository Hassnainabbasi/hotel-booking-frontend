import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./booking.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, reset } from "../../feautures/booking/bookingSlice";
import BASE_URL from "../../../../constant";

export const Booking = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess } = useSelector((state) => state.booking);
  console.log(isSuccess)

  const { name, email, checkInDate, checkOutDate } = formData;

  useEffect(() => {
    const getRooms = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/rooms/${id}`, {
          method: "GET",
        });
        if (!res.ok) {
          return console.log("there was a problem getting room");
        }
        const data = await res.json();
        return setData(data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      roomId: id,
      name,
      email,
      checkInDate,
      checkOutDate,
      confirm : false
    };
    console.log(dataToSubmit);
    dispatch(createBooking(dataToSubmit));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/success");
      dispatch(reset());
    }
  }, [isSuccess, navigate, dispatch]);

  return (
    <div>
      <h1 className="heading center">Booking Now</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter full name"
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter email address"
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Check In Date</label>
            <input
              type="date"
              name="checkInDate"
              value={checkInDate}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Check Out Date</label>
            <input
              type="date"
              name="checkOutDate"
              value={checkOutDate}
              onChange={handleChange}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};
