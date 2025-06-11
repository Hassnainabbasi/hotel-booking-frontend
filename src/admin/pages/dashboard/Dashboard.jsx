import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getBooking } from '../../../client/feautures/booking/bookingSlice'
import BookingList from '../../component/BookingList'
import "./dashboard.styles.scss"

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} =  useSelector((state) => state.auth)
     const { bookings, isLoading } = useSelector((state) => state.booking);
      useEffect(() => {
        if (!user) {
          navigate("/login");
        } else {
          dispatch(getBooking());
        }
      }, [user, dispatch, navigate]);
    
      useEffect(() => {
        console.log("Bookings data:", bookings);
      }, [bookings]);
  return (
    <div id="dashboard">
      <h1 className="heading center">Dashboard</h1>
      {isLoading ? (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif "
          alt=""
        />
      ) : bookings?.length > 0 ? (
        <BookingList data={bookings} />
      ) : (
        <p className="center">No bookings found.</p>
      )}
    </div>
  );
}

export default Dashboard