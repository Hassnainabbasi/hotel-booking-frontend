import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBooking } from "../../feautures/booking/bookingSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } 
  }, [user, dispatch, navigate]);

  return (
    <div>
      <h1 className="heading center">Dashboard</h1>
      
    </div>
  );
};

export default Dashboard;
