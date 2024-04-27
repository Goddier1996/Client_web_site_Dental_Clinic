import React from "react";
import "../ChatBot.css";
import LazyLoadImg from "../../lazyLoad/LazyLoadImg";


const ShowHoursWork = () => {

  return (
    <div className="showDaysWorks">
      <div style={{ marginBottom: "10px" }}>
        <LazyLoadImg
          type=""
          img="https://i.postimg.cc/rpSJbHSs/pngwing-com-2.webp"
          width="250"
          height=""
          alt="clock"
        />
      </div>
      <p>
        {" "}
        Sunday : 10am - 7pm
        <br />
        Monday : 10am - 7pm
        <br />
        Tuesday : 10am - 7pm
        <br />
        Wednesday : 10am - 7pm
        <br />
        Thursday : 10am - 7pm
        <br />
        Friday : 10am - 2pm
        <br />
        Saturday : Closed{" "}
      </p>
    </div>
  );
};


export default ShowHoursWork;