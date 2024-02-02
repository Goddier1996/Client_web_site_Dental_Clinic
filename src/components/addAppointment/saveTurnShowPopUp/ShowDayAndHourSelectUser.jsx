import React from "react";


const ShowDayAndHourSelectUser = ({ day, hour }) => {

  return (
    <div className="showInfoUserQueue">
      <h6>Information about the queue I selected</h6>
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