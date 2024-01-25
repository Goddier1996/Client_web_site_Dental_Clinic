import React from "react";
import Button from "react-bootstrap/Button";
import RobotBox from "../ReCAPTCHA/RobotBox.jsx";
import { useState } from "react";
import "./appointment.css";
import  LazyLoadImg  from "../tools/lazyLoad/LazyLoadImg.jsx";



const ModelPopUpSaveTurn = ({
  capVal,
  saveDateUser,
  closePopUpRobotBoxUserExit,
  setCapVal,
}) => {


  const [userSaveTurn, setUserSaveTurn] = useState(false);


  const saveDayAndHour = () => {
    setUserSaveTurn(true);
    saveDateUser();
  };


  return(
    <div className="showRobotBoxAppoinment">
      <div className={!userSaveTurn ? "gifImageRobot" : "gifImageUserSaveData"}>
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
            height="190"
            alt="use save Appointment"
          />
        )}
      </div>

      {/* check box if user don't robot */}
      <div>{!userSaveTurn ? <RobotBox activeRobotBox={setCapVal} /> : ""}</div>

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
  );
};


export default ModelPopUpSaveTurn;