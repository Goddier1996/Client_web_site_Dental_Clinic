import React from "react";
import { motion as m } from "framer-motion/dist/framer-motion";
import { item } from "../../styleComponents/StyleAnimation";


const ButtonAppointment = ({ CheckUserConnectedFunc }) => {

  let storedTheme = localStorage.getItem("theme");

  return (
    <div className="d-grid gap-2 click">
      <m.Button
        variant={
          storedTheme === "light"
            ? "warning"
            : storedTheme === "dark"
            ? "success"
            : ""
        }
        variants={item}
        style={{ color: "#ffffff" }}
        size="sm"
        onClick={CheckUserConnectedFunc}
      >
        <b className="BookAppointmentText">Book Appointment</b>
      </m.Button>
    </div>
  );
};


export default ButtonAppointment;