import React, { useEffect, useState } from "react";
import "../appointment.css";
import { Row } from "react-bootstrap";
import NoQueusesToday from "../NoQueusesToday.jsx";
import LoadingDaysHour from "../../loading/LoadingDaysHour.jsx";
import NotFoundPage from "../../tools/pageNotFound/NotFoundPage.jsx";
import ShowHours from "./ShowHours.jsx";
import {
  GetTime,
  GetDayWeekFromArray,
  IncrementDateLooUserTurn,
} from "../function/AlertUserHaveTurnToday.js";
import ShowWhatDayToday from "../days/ShowWhatDayToday.jsx";
import { useQueryLoadingDataID } from "../../../customHook/customQueryHook.js";
import { LoadHour } from "../../../Api/LoadDataFromApi.js";



const LoadingAllFuncShowHours = ({ showPopUpReCAPTCHA, dataIdDay }) => {


  const dayFromArray = GetDayWeekFromArray(new Date());
  const hoursAndMinutes = GetTime(new Date());

  const [idDayToday, setIdDayToday] = useState();

  // use query hook
  const {
    isLoading: LoadingHours,
    data: Hours,
    isError: ErrorHours,
  } = useQueryLoadingDataID("HourDayId", LoadHour, idDayToday);

    
  useEffect(() => {
      setIdDayToday(dataIdDay.idDay);
  }, [dataIdDay.dayToday, dataIdDay.idDay]);


    return(
    <>
      <div className="borderPlace"></div>

      <div className="chioseDayAndDay">
        
       {/* show text what day user choose and show date */}
        <ShowWhatDayToday takeDayAndCodeDayInResultHour={dataIdDay.idDay} />
          
        <div id="results" className="search-results">
          {/* show Loading */}
          {LoadingHours ? (
            <LoadingDaysHour />
          ) : ErrorHours ? (
            <NotFoundPage />
          ) : (
            <>
              {dayFromArray == dataIdDay.dayToday ? (
                <>
                  {hoursAndMinutes >= "19:00" || dayFromArray=="Friday" && hoursAndMinutes >= "14:00" ? (
                    <NoQueusesToday />
                  ) : (
                    <>
                      <Row xs={2} md={4} lg={4}>
                        {Hours.map((hourThisDay) => {
                          return (
                            <>
                              {hourThisDay.Hour_day > hoursAndMinutes ? (
                                <div key={hourThisDay._id}>
                                  <ShowHours
                                    hours={hourThisDay}
                                    ShowPopUpReCAPTCHA={() =>
                                      showPopUpReCAPTCHA(
                                        hourThisDay.Hour_day,
                                        hourThisDay._id
                                      )
                                    }
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </>
                          );
                        })}
                      </Row>
                    </>
                  )}
                </>
              ) : (
                <Row xs={2} md={4} lg={4}>
                  {Hours.map((hour) => {
                    return (
                      <>
                        <div key={hour._id}>
                          <ShowHours
                            hours={hour}
                            ShowPopUpReCAPTCHA={() =>
                              showPopUpReCAPTCHA(hour.Hour_day, hour._id)
                            }
                          />
                        </div>
                      </>
                    );
                  })}
                </Row>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};


export default LoadingAllFuncShowHours;