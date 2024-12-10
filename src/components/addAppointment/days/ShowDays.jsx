import React from "react";
import { Button } from "react-bootstrap";


const ShowDays = ({ showDay, funcLoadHoursThisDay }) => {

  return (
    <Button
      size="sm"
      variant="outline"
      className={
        showDay.IsActive == "1" ? "showDayItemsActive" : "showDayItemsNotActive"
      }
      onClick={() =>
        showDay.IsActive == "1"
          ? funcLoadHoursThisDay(showDay.Serial_code, showDay.Day_date)
          : null
      }
    >
      <span>{showDay.Day_date}</span>
    </Button>
  );
};


export default ShowDays;