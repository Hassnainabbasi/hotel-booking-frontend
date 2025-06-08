import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./room.styles.scss"

export const Room = () => {
    const [data, setData] = useState(null)
    const {id} = useParams()

  useEffect(() => {
    const getRooms = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/rooms/${id}`,{
            method : "GET"
        });
        if(res.ok){
            const data = await res.json()
            console.log(data)
            console.log(data.img)
            setData(data)
        }
      } catch (err) {
        console.log(err);
      }
    };
    getRooms();
  }, []);
  return (
    <div id="room">
      {data ? (
        <div>
          <div className="img-wrapper">
            <img src={data.img[0]} alt="" />
          </div>
          <div className="text-wrapper">
            <h1 className="heading center">{data.name}</h1>
            <p>{data.des}</p>
            <h2>${data.price.toFixed(2)}</h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};
