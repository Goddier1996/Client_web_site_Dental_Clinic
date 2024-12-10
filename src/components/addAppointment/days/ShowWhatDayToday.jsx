import React from "react";
import { IncrementDateLooUserTurn } from "../function/AlertUserHaveTurnToday";

const ShowWhatDayToday = ({ takeDayAndCodeDayInResultHour }) => {


  let storedTheme = localStorage.getItem("theme");

  let IncrementDayDateTurnUser = IncrementDateLooUserTurn(
    new Date(),
    takeDayAndCodeDayInResultHour
  ).toDateString();


  return (
    <>
      <h6
        style={
          storedTheme === "light"
            ? { color: "white" }
            : storedTheme === "dark"
            ? { color: "GrayText" }
            : ""
        }
      >
        {IncrementDayDateTurnUser}
      </h6>
    </>
  );
};


export default ShowWhatDayToday;