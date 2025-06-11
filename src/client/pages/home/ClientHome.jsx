import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.styles.scss";

export default function ClientHome() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero">
        <img
          src="https://momblogsociety.com/wp-content/uploads/2019/03/hotels.jpg"
          alt="hotel"
        />
        <div className="overlay">
          <h1>Find Your Perfect Stay</h1>
          <p>Comfort, luxury, and convenience — all in one place.</p>
          <button onClick={() => navigate("/rooms")}>Explore Rooms</button>
        </div>
      </div>

      <div className="features">
        <div className="feature">
          <h3>Easy Booking</h3>
          <p>Book your stay in just a few clicks with our simple interface.</p>
        </div>
        <div className="feature">
          <h3>Secure Payments</h3>
          <p>Your data and transactions are 100% protected with us.</p>
        </div>
        <div className="feature">
          <h3>24/7 Support</h3>
          <p>Need help? Our support team is always available.</p>
        </div>
      </div>

      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} HotelBooking. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
