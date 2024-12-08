import React from "react";
import { ShowStartAndEndDateWork } from "./function/AlertUserHaveTurnToday";
import "./appointment.css";


const ShowStartAndEndDateWorkTurn = () => {

  const showFirstEndDate = ShowStartAndEndDateWork();
  // all data what we save in local storage and session Storage
  let storedTheme = localStorage.getItem("theme");

  return (
    <div
      className={
        storedTheme === "light"
          ? "showFirstEndDateDark"
          : storedTheme === "dark"
          ? "showFirstEndDate"
          : ""
      }
    >
      <p>
        {showFirstEndDate}
        <br />
        <span className="infoAppointments">* Appointments per week </span>
      </p>
    </div>
  );
};


export default ShowStartAndEndDateWorkTurn;