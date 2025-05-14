import React from "react";
import { Button, Modal } from "react-bootstrap";
import Appointment from "../addAppointment/Appointment.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";
import LazyLoadImg from "../tools/lazyLoad/LazyLoadImg.jsx";
import { GetDayWeekFromArray } from "../addAppointment/function/AlertUserHaveTurnToday";


const PopUpAppointment = ({ showModelAppointment, closePopUpAppointment }) => {

  let storedTheme = localStorage.getItem("theme");
  let day = GetDayWeekFromArray(new Date());

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
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

        <div className="showWhatDatToday">
          <LazyLoadImg
            type=""
            img={require(`../../images/dayImages/${day}.webp`)}
            width=""
            height="35"
            alt={`Day-${day}`}
          />
        </div>

        <div
          className="titleHeater"
          style={{ marginTop: "-10%", marginBottom: "-2%" }}
        >
          <LazyLoadImg
            type=""
            img="https://i.postimg.cc/HxR0sFNr/22.webp"
            width=""
            height="90"
            alt="day"
          />
        </div>

        {/* show all days and hours to add turn user */}
        <Appointment />
      </div>
    </Modal>
  );
};


export default PopUpAppointment;