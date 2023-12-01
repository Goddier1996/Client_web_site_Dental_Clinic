import React, { useState } from 'react'
import { Button, Row, Modal } from 'react-bootstrap';
import '../../css/appointment.css'
import Swal from 'sweetalert2'
import { LoadDays, LoadHour } from '../../Api/LoadDataFromApi'
import { DeleteHour, UpdateDataUserAddTurn } from '../../Api/DeleteUpdateDataFromApi'
import NotFoundPage from '../tools/NotFoundPage'
import { useQueryOnlyLoadingData, useQueryDataLoadingRefetchAutoData } from "../../customHook/customQueryHook"
import { GetTime, GetDayWeekFromArray } from './AlertUserHaveTurnToday'
import ModelPopUpSaveTurn from './ModelPopUpSaveTurn';



//here component we show days+hours (if you click to button in Home Page Book an appointment)
function Appointment() {


    // show pop up
    const [showPopUpRobotBox, setShowPopUpRobotBox] = useState(false);
    const handleShowPopUpRobotBox = () => setShowPopUpRobotBox(true);


    // check box if user not robot
    const [capVal, setCapVal] = useState(false);


    //show a pop up hour
    const [showResultsHours, setShowResultsHours] = useState(false);


    const [writeNoQueuesToday, setWriteNoQueuesToday] = useState(false);


    // check in ResultsHours function today , which hours work and free today
    let takeDayAndCodeDayInResultHour;
    let dayFromArray;
    let hoursAndMinutes;


    // all data what we save in local storage and session Storage
    let storedTheme = localStorage.getItem("theme");
    let userData = JSON.parse(sessionStorage.getItem("user"));



    // use custom hook , useQuery + days,hours
    const { isLoading: LoadingDays, data: days, isError: ErrorDays } =
        useQueryOnlyLoadingData('allDays', LoadDays, null);

    const { isLoading: LoadingHours, data: Hours, isError: ErrorHours } =
        useQueryDataLoadingRefetchAutoData('HourDayId', null, LoadHour, takeDayAndCodeDayInResultHour);



    //here you show Hours from day what we choose , from data base 
    const LoadHours = async (Serial_code, Day_date) => {

        let dataDay = { Day: Day_date, Serial_code: Serial_code };

        await sessionStorage.setItem("day", JSON.stringify(dataDay));

        setShowResultsHours(true);
    }



    //show (jsx) return we see in pup up hours - and click to hour we save what day we choose and hour to data base
    const ResultsHours = () => (

        takeDayAndCodeDayInResultHour = JSON.parse(sessionStorage.getItem("day")),
        dayFromArray = GetDayWeekFromArray(new Date),
        hoursAndMinutes = GetTime(new Date),

        <>
            <div className='borderPlace'></div>

            <div className='chioseDayAndDay'>

                <img src='https://i.postimg.cc/zDW8DS7c/clock.png' />

                <h6 style={(storedTheme === "light") ? { color: "white" } :
                    (storedTheme === "dark") ? { color: "GrayText" } : ""}>
                    Day {takeDayAndCodeDayInResultHour.Day}
                </h6>

                <div id="results" className="search-results">

                    {/* show Loading */}
                    {(LoadingHours) ?
                        <div className='loadingDaysHour'>
                            <img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!f305cw" />
                        </div>
                        :
                        (ErrorHours) ?
                            <>
                                <NotFoundPage />
                            </>
                            :
                            <>
                                {dayFromArray == takeDayAndCodeDayInResultHour.Day ?
                                    <>
                                        {!writeNoQueuesToday ?
                                            <Row xs={2} md={4} lg={4}>
                                                {Hours.map(hourThisDay => {

                                                    return (
                                                        <>
                                                            {hourThisDay.Hour_day >= hoursAndMinutes ?
                                                                <div key={hourThisDay._id}>
                                                                    <p href='#'
                                                                        style={(storedTheme === "light") ? { textDdecoration: "none", color: "white" } :
                                                                            (storedTheme === "dark") ? { textDdecoration: "none" } : ""}
                                                                        onClick={() => showPopUpReCAPTCHA(hourThisDay.Hour_day, hourThisDay._id)}>{hourThisDay.Hour_day}
                                                                    </p>
                                                                </div>
                                                                :
                                                                setWriteNoQueuesToday(true)
                                                            }
                                                        </>
                                                    )
                                                }
                                                )
                                                }
                                            </Row>
                                            :
                                            <div className='writeNotHaveTodayTurn'>
                                                <h6
                                                    style={(storedTheme === "light") ? { textDdecoration: "none", color: "white" } :
                                                        (storedTheme === "dark") ? { textDdecoration: "none" } : ""}
                                                >
                                                    No queues today
                                                    <br /><br />
                                                    A working day is over 😁
                                                </h6>
                                            </div>
                                        }
                                    </>
                                    :
                                    <Row xs={2} md={4} lg={4}>
                                        {Hours.map(hour => {

                                            return (
                                                <div key={hour._id}>
                                                    <p href='#'
                                                        style={(storedTheme === "light") ? { textDdecoration: "none", color: "white" } :
                                                            (storedTheme === "dark") ? { textDdecoration: "none" } : ""}
                                                        onClick={() => showPopUpReCAPTCHA(hour.Hour_day, hour._id)}>{hour.Hour_day}
                                                    </p>
                                                </div>
                                            )
                                        }
                                        )}
                                    </Row>
                                }
                            </>
                    }
                </div>
            </div>
        </>
    )



    const showPopUpReCAPTCHA = (Hour_day, Serial_code) => {

        handleShowPopUpRobotBox();

        let dataHour = { Hour_day, Serial_code }
        sessionStorage.setItem("Hour", JSON.stringify(dataHour))
    }



    // save to user date , hour and day what he chiose
    const saveDateUser = async () => {

        if (capVal) {

            let dayLocal = JSON.parse(sessionStorage.getItem("day"));
            let hourLocal = JSON.parse(sessionStorage.getItem("Hour"));

            await UpdateDataUserAddTurn(userData._id, dayLocal.Day, hourLocal.Hour_day, hourLocal.Serial_code);
            await DeleteHour(hourLocal.Serial_code);

            await Swal.fire({
                title: `Youre making an appointment`,
                text: `${dayLocal.Day} ${hourLocal.Hour_day}`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                position: 'center',
                background: `${(storedTheme === "light") ? "#373E44" :
                    (storedTheme === "dark") ? "" : ""}`,
                color: `${(storedTheme === "light") ? "#ffffffab" :
                    (storedTheme === "dark") ? "" : ""}`,
                buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                    (storedTheme === "dark") ? "" : ""}`
            })
            await sessionStorage.clear();
            setCapVal(false);
            window.location.reload(false);
        }
    }



    const closePopUpRobotBoxUserExit = () => {

        setShowPopUpRobotBox(false);
        setCapVal(false);
    }



    return (

        <>
            {/* show Loading */}
            {(LoadingDays) ?
                <div className='loadingDaysHour'>
                    <img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!f305cw" />
                </div>
                :
                (ErrorDays) ?
                    <>
                        <NotFoundPage />
                    </>
                    :
                    <>

                        <div className={(storedTheme === "light") ? "showDayDark" : (storedTheme === "dark") ? "showDay" : ""}>
                            <Row xs={2} md={5} lg={4} className="g-4">

                                {days.map(day =>

                                    <div className='showDayItems' key={day._id}>
                                        <Button size="sm" variant="outline-secondary"
                                            onClick={() => LoadHours(day.Serial_code, day.Day_date)}>
                                            {day.Day_date}
                                        </Button>
                                    </div>
                                )}
                            </Row>

                            <Modal.Body>
                                {showResultsHours ? <ResultsHours /> : null}
                            </Modal.Body>

                        </div>
                    </>
            }


            {/* show popUp check if user not robot and save Turn */}
            <Modal show={showPopUpRobotBox} style={{ background: "rgba(0, 0, 0, 0.75)" }}>

                <ModelPopUpSaveTurn
                    capVal={capVal}
                    saveDateUser={saveDateUser}
                    closePopUpRobotBoxUserExit={closePopUpRobotBoxUserExit}
                    setCapVal={() => setCapVal(true)}
                />

            </Modal>
        </>
    )

}

export default Appointment;