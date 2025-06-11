import React from "react";
import "./tablecomponent.styles.scss";
import { Link } from "react-router-dom";

const BookingList = ({ data, onDelete }) => {
  const handleDelete = (user) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the booking for ${user.name}?`
    );
    if (confirmDelete) {
      onDelete(user.id);
    }
  };

  return (
    <div className="container">
      <div className="table-wrapper">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Room Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user?.id}>
                <td data-label="Name">{user?.name}</td>
                <td data-label="Email">{user?.email}</td>
                <td data-label="Room No">{user?.roomId?.roomNumbers[0]?.number}</td>
                <td data-label="Action">
                <Link to={`/bookings/${user._id}`}>
                <button className="delete-btn">View</button>
                </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
