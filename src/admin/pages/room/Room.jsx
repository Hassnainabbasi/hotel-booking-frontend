import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./room.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom, reset } from "../../../admin/feautures/room/roomSlice";
import { Carousel } from "../../../admin/component/Carousel";

export const Room = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.room);
  console.log(isSuccess, "is Success");
  console.log(user);
  useEffect(() => {
    const getRooms = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/rooms/${id}`, {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          console.log(data.img, "this is ");
          setData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getRooms();
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        dispatch(deleteRoom(id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/rooms");
    }
  }, [isSuccess, navigate, dispatch]);

  return (
    <div id="room">
      {data ? (
        <div>
          <div className="img-wrapper">
            <Carousel data={data.img} />
            {/* <img src={data.img[0]} alt="" /> */}
          </div>
          <div className="text-wrapper">
            <h1 className="heading center">{data.name}</h1>
            <p>{data.des}</p>
            <h2>${data.price.toFixed(2)}</h2>
            {user?.isAdmin && (
              <div id="cta-wrapper">
                <Link to={`/rooms/edit/${data._id}`}>Edit Room</Link>
                <button onClick={handleDelete}>Delete Room</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <h1 className="heading center">No Rooms Available</h1>
      )}
    </div>
  );
};
