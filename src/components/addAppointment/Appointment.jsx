import React, { useState } from "react";
import { Row, Modal } from "react-bootstrap";
import "./appointment.css";
import { LoadDays } from "../../Api/LoadDataFromApi";
import NotFoundPage from "../tools/pageNotFound/NotFoundPage.jsx";
import { useQueryLoadingAllData } from "../../customHook/customQueryHook";
import ModelPopUpSaveTurn from "./ModelPopUpSaveTurn.jsx";
import ShowDays from "./days/ShowDays.jsx";
import LoadingDaysHour from "../loading/LoadingDaysHour.jsx";
import LoadingAllFuncShowHours from "./hours/LoadingAllFuncShowHours.jsx";
import { saveDateUserTurnDayAndHour } from "./function/AddTurnFunctions.js";


//here component we show days+hours (if you click to button in Home Page Book an appointment)
function Appointment() {


  // show pop up
  const [showPopUpRobotBox, setShowPopUpRobotBox] = useState(false);
  const handleShowPopUpRobotBox = () => setShowPopUpRobotBox(true);

  // check box if user not robot
  const [capVal, setCapVal] = useState(false);

  //show a pop up hour
  const [showResultsHours, setShowResultsHours] = useState(false);

  // all data what we save in local storage and session Storage
  let storedTheme = localStorage.getItem("theme");
  let userData = JSON.parse(sessionStorage.getItem("user"));

    
  // use custom hook , useQuery + days,hours
  const {
    isLoading: LoadingDays,
    data: days,
    isError: ErrorDays,
  } = useQueryLoadingAllData("allDays", LoadDays);

    
    
  const [dataIdDay, setDataIdDay] = useState({});

  //here you show Hours from day what we choose , from data base
  const LoadHours = async (Serial_code, Day_date) => {
    
    setDataIdDay({ dayToday: Day_date, idDay: Serial_code });

    setShowResultsHours(true);
  };

    
    
  const [dataIdHour, setDataIdHour] = useState({});

  const showPopUpReCAPTCHA = (Hour_day, Serial_code) => {
    
    handleShowPopUpRobotBox();

    setDataIdHour({ hourDayChoose: Hour_day, idHour: Serial_code });
  };

    
  // save user hour and day what he choose
  const saveDateUser = async () => {
    
    let userDataTurn = {
      _id: userData._id,
      dayToday: dataIdDay.dayToday,
      hourDayChoose: dataIdHour.hourDayChoose,
      idHour: dataIdHour.idHour,
    };

    saveDateUserTurnDayAndHour(userDataTurn, capVal);
  };

    
  const closePopUpRobotBoxUserExit = () => {
    setShowPopUpRobotBox(false);
    setCapVal(false);
  };

    
    
  return (
    <>
      {/* show Loading */}
      {LoadingDays ? (
        <LoadingDaysHour />
      ) : ErrorDays ? (
        <NotFoundPage />
      ) : (
        <div
          className={
            storedTheme === "light"
              ? "showDayDark"
              : storedTheme === "dark"
              ? "showDay"
              : ""
          }
        >
          <Row xs={2} md={5} lg={4} className="g-4">
            {days.map((day) => (
              <div className="showDayItems" key={day._id}>
                <ShowDays showDay={day} funcLoadHoursThisDay={LoadHours} />
              </div>
            ))}
          </Row>

          <Modal.Body>
            {showResultsHours ? (
              <LoadingAllFuncShowHours
                showPopUpReCAPTCHA={showPopUpReCAPTCHA}
                dataIdDay={dataIdDay}
              />
            ) : null}
          </Modal.Body>
        </div>
      )}

      {/* show popUp check if user not robot and save Turn */}
      <Modal
        show={showPopUpRobotBox}
        style={{ background: "rgba(0, 0, 0, 0.75)" }}
      >
        <ModelPopUpSaveTurn
          capVal={capVal}
          saveDateUser={saveDateUser}
          closePopUpRobotBoxUserExit={closePopUpRobotBoxUserExit}
          setCapVal={() => setCapVal(true)}
        />
      </Modal>
    </>
  );
}

export default Appointment;
