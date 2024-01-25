import React, { useState, useEffect } from "react";
import {
  GetDayWeekFromArray,
  GetTime,
} from "../../addAppointment/function/AlertUserHaveTurnToday";
import  LazyLoadImg  from "../../tools/lazyLoad/LazyLoadImg";


const OpenOrCloseClinic = () => {

  const [openOrClose, setOpenOrClose] = useState(false);

  let hoursAndMinutes;
  let day;

    
  useEffect(() => {
    hoursAndMinutes = GetTime(new Date());
    day = GetDayWeekFromArray(new Date());

    {
      day == "Saturday"
        ? setOpenOrClose(false)
        : day == "Friday" &&
          hoursAndMinutes >= "10:00" &&
          hoursAndMinutes < "14:00"
        ? setOpenOrClose(true)
        : day != "Friday" &&
          hoursAndMinutes >= "10:00" &&
          hoursAndMinutes < "19:00"
        ? setOpenOrClose(true)
        : setOpenOrClose(false);
    }
  }, [openOrClose]);

    
    
  return (
    <div className="openOrCloseClinic">
      {openOrClose ? (
        <LazyLoadImg
          type=""
          img="https://i.postimg.cc/yYsNwvQB/openn.webp"
          width="60"
          height=""
          alt="open"
        />
      ) : (
        <LazyLoadImg
          type=""
          img="https://i.postimg.cc/FzZhrXWv/closee.webp"
          width="60"
          height=""
          alt="close"
        />
      )}
    </div>
  );
};


export default OpenOrCloseClinic;