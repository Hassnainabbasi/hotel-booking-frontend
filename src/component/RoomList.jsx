import React from 'react'
import { Link } from 'react-router-dom'
import "./roomlist.styles.scss"

export const RoomList = ({data}) => {
  return (
    <div id='room-list'>
     {data.map((item, index) =>{
        return (
          <Link className='room-unit' to={`/rooms/all/${item._id}`} key={item._id}>
            <div className='img-wrapper'>
              <img src={item.img[0]} alt="" />
            </div>
            <p className="name">{item.name}</p>
          </Link>
        );
     })}
    </div>
  )
}
