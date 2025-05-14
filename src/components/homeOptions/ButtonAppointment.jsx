import React from "react";
import { Button } from "react-bootstrap";
// import LazyLoadImg from "../tools/lazyLoad/LazyLoadImg";
import { GetDayWeekFromArray } from "../addAppointment/function/AlertUserHaveTurnToday";


const ButtonAppointment = ({ CheckUserConnectedFunc }) => {

  let storedTheme = localStorage.getItem("theme");
  let day = GetDayWeekFromArray(new Date());

  return (
    <div className="d-grid gap-2 click">
      <Button
        variant={
          storedTheme === "light"
            ? "warning"
            : storedTheme === "dark"
            ? "success"
            : ""
        }
        style={
          storedTheme === "light"
            ? { color: "rgba(0, 0, 0, 0.58)" }
            : storedTheme === "dark"
            ? { color: "#ffffff" }
            : ""
        }
        size="sm"
        onClick={CheckUserConnectedFunc}
      >
        Book Appointment{" "}
        {/* <LazyLoadImg
          type=""
          img={require(`../../images/dayImages/${day}.webp`)}
          width=""
          height="35"
          alt={`Day-${day}`}
        /> */}
      </Button>
    </div>
  );
};


export default ButtonAppointment;