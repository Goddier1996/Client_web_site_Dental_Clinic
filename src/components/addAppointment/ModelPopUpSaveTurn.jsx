import React from "react";
import Button from "react-bootstrap/Button";
import RobotBox from "../ReCAPTCHA/RobotBox.jsx";
import { useState } from "react";
import "./appointment.css";


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

    // setTimeout(() => {
    //   saveDateUser();
    // }, 1200);
  };

    
  return (
    <div className="showRobotBoxAppoinment">
      <div className={!userSaveTurn ? "gifImageRobot" : "gifImageUserSaveData"}>
        {!userSaveTurn ? (
          <img src="https://i.postimg.cc/bvjTR4mC/robot.gif" />
        ) : (
          <img src="https://i.postimg.cc/TwLD8KBC/saveTurn.gif" />
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