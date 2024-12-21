import React from "react";
import "../appointment.css";


const EndDaysWorkingThisWeekMessage = () => {

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
      <h6 className="infoAppointmentsEndDays">
        <b>Important information,</b> working days are over for this week.
        <br />
        We will update the days on Saturday at <b>11:00 at night!</b>
      </h6>
    </div>
  );
};


export default EndDaysWorkingThisWeekMessage;