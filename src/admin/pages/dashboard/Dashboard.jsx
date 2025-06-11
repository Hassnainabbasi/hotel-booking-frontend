import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getBooking } from '../../../client/feautures/booking/bookingSlice'
import BookingList from '../../component/BookingList'

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} =  useSelector((state) => state.auth)
     const { bookings } = useSelector((state) => state.booking);
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
    <div>
    <h1 className="heading center">Dashboard</h1>
    { bookings?.length > 0 ? <BookingList data={bookings}/> : null }
    </div>
  )
}

export default Dashboard