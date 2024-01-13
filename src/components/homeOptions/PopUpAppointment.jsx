import React from "react";
import { Button, Modal } from "react-bootstrap";
import Appointment from "../addAppointment/Appointment.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";


const PopUpAppointment = ({ showModelAppointment, closePopUpAppointment }) => {


  let storedTheme = localStorage.getItem("theme");

  return (
    <div className="bookClick">
      <Modal
        show={showModelAppointment}
      >
        <div
          className={
            storedTheme === "light"
              ? "showModelAddAppointmentUserDark"
              : storedTheme === "dark"
              ? "showModelAddAppointmentUser"
              : ""
          }
        >
          <div className="closeModelAddAppointmentUser">
            <Button
              style={
                storedTheme === "light"
                  ? { background: "#424242" }
                  : storedTheme === "dark"
                  ? { background: "white" }
                  : ""
              }
              variant="contained"
              onClick={closePopUpAppointment}
            >
              <i
                style={
                  storedTheme === "light"
                    ? { fontSize: "20px", color: "white" }
                    : storedTheme === "dark"
                    ? { fontSize: "20px", color: "black" }
                    : ""
                }
                className="bi bi-x-lg"
              ></i>
            </Button>
          </div>

          <div className="titleHeater">
            <img src="https://i.postimg.cc/HxR0sFNr/22.webp" />
          </div>

           {/* show all days and hours to add turn user */}
           <Appointment />
        </div>
      </Modal>
    </div>
  );
};


export default PopUpAppointment;