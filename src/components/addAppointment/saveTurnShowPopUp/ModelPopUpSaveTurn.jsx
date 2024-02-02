import React from "react";
import { Modal, Button } from "react-bootstrap";
import RobotBox from "../../ReCAPTCHA/RobotBox.jsx";
import { useState } from "react";
import "../appointment.css";
import LazyLoadImg from "../../tools/lazyLoad/LazyLoadImg.jsx";
import ShowDayAndHourSelectUser from "./ShowDayAndHourSelectUser.jsx";



const ModelPopUpSaveTurn = ({
  show,
  capVal,
  saveDateUser,
  closePopUpRobotBoxUserExit,
  setCapVal,
  showDataHour,
  showDataDay,
}) => {


  const [userSaveTurn, setUserSaveTurn] = useState(false);

  const saveDayAndHour = () => {
    setUserSaveTurn(true);
    saveDateUser();
  };


  return (
    <Modal show={show}>
      <div className="showRobotBoxAppoinment">
        <div
          className={!userSaveTurn ? "gifImageRobot" : "gifImageUserSaveData"}
        >
          {!userSaveTurn ? (
            <LazyLoadImg
              type=""
              img="https://i.postimg.cc/bvjTR4mC/robot.gif"
              width=""
              height="200"
              alt="robot check"
            />
          ) : (
            <LazyLoadImg
              type=""
              img="https://i.postimg.cc/TwLD8KBC/saveTurn.gif"
              width=""
              height=""
              alt="use save Appointment"
            />
          )}
        </div>

        {/* here show info about turn user select */}
        {!userSaveTurn ? (
          <ShowDayAndHourSelectUser day={showDataDay} hour={showDataHour} />
        ) : null}

        {/* check box if user don't robot */}
        <div>
          {!userSaveTurn ? <RobotBox activeRobotBox={setCapVal} /> : ""}
        </div>

        <div className="appointmentRobotBoxButton">
          {!userSaveTurn ? (
            <>
              <Button
                style={!capVal || userSaveTurn ? { cursor: "not-allowed" } : {}}
                onClick={saveDayAndHour}
                disabled={!capVal || userSaveTurn}
                variant="success"
              >
                {capVal ? "Click And We Save Turn" : "Save Turn"}
              </Button>

              <Button
                onClick={closePopUpRobotBoxUserExit}
                disabled={userSaveTurn}
                variant="danger"
              >
                Close
              </Button>
            </>
          ) : (
            <div className="saveUserTurn">
              <p>Please Wait , We Save Your Turn</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};


export default ModelPopUpSaveTurn;