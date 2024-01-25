import React from "react";
// import  LazyLoadImg  from "../../tools/lazyLoad/LazyLoadImg";



const ShowWhatDayToday = ({ takeDayAndCodeDayInResultHour }) => {


  let storedTheme = localStorage.getItem("theme");

    
  return (
    <>
      {/* <LazyLoadImg
        type=""
        img="https://i.postimg.cc/bv30tZZS/z2.webp"
        width=""
        height=""
        alt="clock"
      /> */}
      <h6
        style={
          storedTheme === "light"
            ? { color: "white" }
            : storedTheme === "dark"
            ? { color: "GrayText" }
            : ""
        }
      >
        Day {takeDayAndCodeDayInResultHour}
      </h6>
    </>
  );
};


export default ShowWhatDayToday;