import React from "react";


const ShowDayAndHourSelectUser = ({ day, hour }) => {

  return (
    <div className="showInfoUserQueue">
      <i class="bi bi-arrow-down"></i>
      <p>
        Day: {day}
        <br />
        Hour: {hour}
      </p>
    </div>
  );
};


export default ShowDayAndHourSelectUser;