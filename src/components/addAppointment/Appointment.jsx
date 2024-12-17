import React, { useState } from "react";
import { Row, Modal } from "react-bootstrap";
import "./appointment.css";
import { LoadDays } from "../../Api/LoadDataFromApi";
import NotFoundPage from "../tools/pageNotFound/NotFoundPage.jsx";
import { useQueryLoadingAllData } from "../../customHook/customQueryHook";
import ModelPopUpSaveTurn from "./saveTurnShowPopUp/ModelPopUpSaveTurn.jsx";
import ShowDays from "./days/ShowDays.jsx";
import LoadingDaysHour from "../loading/LoadingDaysHour.jsx";
import LoadingAllFuncShowHours from "./hours/LoadingAllFuncShowHours.jsx";
import { saveDateUserTurnDayAndHour } from "./function/AddTurnFunctions.js";
import { ShowModelPopUp } from "../../customHook/showPopUp.js";
import ShowStartAndEndDateWorkTurn from "./ShowStartAndEndDateWorkTurn.jsx";


//here component we show days+hours (if you click to button in Home Page Book an appointment)
function Appointment() {


  // show popup RobotBox custom Hook
  const { show, handleClose, handleShow } = ShowModelPopUp();
  // show popup show hour custom Hook
  const { showOneMoreModel, handleShowOneMoreModel } = ShowModelPopUp();

  // check box if user not robot
  const [capVal, setCapVal] = useState(false);

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
    handleShowOneMoreModel();
  };

  const [dataIdHour, setDataIdHour] = useState({});

  const showPopUpReCAPTCHA = (Hour_day, Serial_code) => {
    handleShow();
    setDataIdHour({ hourDayChoose: Hour_day, idHour: Serial_code });
  };

  // save user hour and day what he choose
  const saveDateUser = async () => {
    let userDataTurn = {
      _id: userData._id,
      dayToday: dataIdDay.dayToday,
      idDay: dataIdDay.idDay,
      hourDayChoose: dataIdHour.hourDayChoose,
      idHour: dataIdHour.idHour,
      Email: userData.Email
    };

    saveDateUserTurnDayAndHour(userDataTurn, capVal);
  };

  const closePopUpRobotBoxUserExit = () => {
    handleClose();
    setCapVal(false);
  };


  return (
    <>
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
          
          {/* show first and end date working this week (Component) */}
          <ShowStartAndEndDateWorkTurn/>
          
          <Row xs={2} md={5} lg={4} className="g-4">
            {days.map((day) => (
              <div className="showDayItems" key={day._id}>
                <ShowDays showDay={day} funcLoadHoursThisDay={LoadHours} />
              </div>
            ))}
          </Row>

          <Modal.Body>
            {showOneMoreModel ? (
              <LoadingAllFuncShowHours
                showPopUpReCAPTCHA={showPopUpReCAPTCHA}
                dataIdDay={dataIdDay}
              />
            ) : null}
          </Modal.Body>
        </div>
      )}

      {/* show popUp check if user not robot and save Turn */}
      <ModelPopUpSaveTurn
        show={show}
        capVal={capVal}
        saveDateUser={saveDateUser}
        closePopUpRobotBoxUserExit={closePopUpRobotBoxUserExit}
        setCapVal={() => setCapVal(true)}
        showDataHour={dataIdHour.hourDayChoose}
        showDataDay={dataIdDay.dayToday}
      />
    </>
  );
}


export default Appointment;