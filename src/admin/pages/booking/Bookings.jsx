import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Bookings = () => {
  const { id } = useParams();
  const [book, setBook] = useState()

  useEffect(() => {
    const getBooking = async() =>{
      try {
        const res = await fetch(`http://localhost:3000/api/booking/${id}`, {
          method: "GET",
        });
        if (!res.ok) {
          return console.log("there was a problem getting room");
        }
        const data = await res.json();
        console.log(data,"thisss")
        return setBook(data);
      } catch (err) {
        console.log(err);
      }
    }
    getBooking()
  }, []);
  return (
    <div>
      <h1 className="heading center">Booking</h1>
      {book && (
        <div>
          <div className="text-wrapper">
            <h1 className="heading">{book.name}</h1>
            <p className="email">{book.email}</p>
            <p className="email">{book.roomId.name}</p>
            <p className="email">CheckIn: {book.checkIn}</p>
            <p className="email">CheckOut: {book.checkOut}</p>
          </div>
        </div>
      )}
    </div>
  );
};
