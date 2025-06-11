import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./booking.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBooking,
  updateBooking,
} from "../../../client/feautures/booking/bookingSlice";
import BASE_URL from "../../../../constant";

export const Bookings = () => {
  const { id } = useParams();
  const [book, setBook] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { isSuccess, isLoading } = useSelector((state) => state.booking);

  useEffect(() => {
    const getBooking = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/booking/${id}`, {
          method: "GET",
        });
        if (!res.ok) {
          setLoading(false);
          return console.log("there was a problem getting room");
        }
        const data = await res.json();
        console.log(data, "thisss");
        return setBook(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getBooking();
  }, []);

  console.log(id);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        dispatch(deleteBooking(id));
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleConfirm = () => {
    if (book) {
      dispatch(updateBooking({ id: book._id, confirm: true }));
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div id="booking">
      <h1 className="heading center">Booking</h1>
      {loading ? (
        <div className="loader-wrapper">
          <img
            className="loader-img"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif "
            alt="Loading..."
          />
        </div>
      ) : (
        book && (
          <div className="content-wrapper">
            <div className="text-wrapper">
              <h1 className="heading">{book.name}</h1>
              <p className="email">{book.email}</p>
              <p className="email">{book.roomId.name}</p>
              <p className="email">CheckIn: {book.checkInDate}</p>
              <p className="email">CheckOut: {book.checkOutDate}</p>
              <div className="cta-wrapper">
                <button onClick={handleConfirm}>Confirm</button>
                <button onClick={handleDelete} className="danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
