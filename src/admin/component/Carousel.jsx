import React, { useEffect, useState } from "react";
import './carousel.styles.scss'

export const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log("", data[currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev == data.length - 1) {
          return (prev = 0);
        } else {
          return (prev + 1);
        }
      });
      return clearInterval(interval)
    }, 8000);
  }, []);
    console.log(currentIndex)
  return (
    <div className="carousel-wrapper">
      <img src={data[currentIndex]} alt="" />
    </div>
  );
};
