import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./booking.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteBooking } from "../../../client/feautures/booking/bookingSlice";

export const Bookings = () => {
  const { id } = useParams();
  const [book, setBook] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess } = useSelector((state) => state.booking);

  useEffect(() => {
    const getBooking = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/booking/${id}`, {
          method: "GET",
        });
        if (!res.ok) {
          return console.log("there was a problem getting room");
        }
        const data = await res.json();
        console.log(data, "thisss");
        return setBook(data);
      } catch (err) {
        console.log(err);
      }
    };
    getBooking();
  }, []);

  console.log(id);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        dispatch(deleteBooking(id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard')
    }
  }, []);

  return (
    <div id="booking">
      <h1 className="heading center">Booking</h1>
      {book && (
        <div className="content-wrapper">
          <div className="text-wrapper">
            <h1 className="heading">{book.name}</h1>
            <p className="email">{book.email}</p>
            <p className="email">{book.roomId.name}</p>
            <p className="email">CheckIn: {book.checkInDate}</p>
            <p className="email">CheckOut: {book.checkOutDate}</p>
            <div className="cta-wrapper">
              <button>Confirm</button>
              <button onClick={handleDelete} className="danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
