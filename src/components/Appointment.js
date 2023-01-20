import React, { useState } from 'react'
import { API } from '../Api/API';
import { Button, Row, Modal } from 'react-bootstrap';
import '../css/appointment.css'
import Swal from 'sweetalert2'
import { LoadDays } from '../Api/LoadDataFromApi'
import { DeleteHour, UpdateDataUserAddTurn } from '../Api/DeleteUpdateDataFromApi'
import { useQuery } from 'react-query'



//here component we show data from data base (if you click to buttom in Home Page Book an appointment)
function Appointment(props) {


    const [Hours, setHours] = useState([])


    //show a pop up day and hour
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)


    // check in ResultsHours function today , which hours work and free today
    let takeDayAndCodeDayInResultHour;
    let dayFromArray;
    let hoursAndMinutes;


    // all data what we save in local storage and seesion storge
    let storedTheme = localStorage.getItem("theme");
    let userData = JSON.parse(sessionStorage.getItem("user"));
    let userDataCode = JSON.parse(sessionStorage.getItem("userCode"));



    // load data Appointment days,hours from LoadDataFromApi component
    const { isLoading: LoadingDays, data: days } = useQuery('allDays', () => {
        return LoadDays();
    })




    //here you show Hours from day what we chiose , from data base 
    const LoadHours = async (Serial_code, Day_date) => {

        let res = await fetch(`${API.HOURS.GET}/${Serial_code}`, { method: 'GET' });
        let data = await res.json();

        setHours(data);

        let dataDay = { Day: Day_date }

        sessionStorage.setItem("day", JSON.stringify(dataDay));

        ResultsHours();
    }



    // use in ResultsHours function
    const GetTime = (date) => {

        let hours = date.getHours();
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = hours < 10 ? '0' + hours : hours;
        // appending zero in the start if hours less than 10
        return hours + ':' + '00';
    }



    // use in ResultsHours function
    const GetDayWeekFromArray = (date) => {

        let Day = date.getDay();
        let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekday[Day];
    }



    //show (jsx) return we see in pup up hours - and click to hour we save what day we choose and hour to data base
    const ResultsHours = () => (

        takeDayAndCodeDayInResultHour = JSON.parse(sessionStorage.getItem("day")),
        dayFromArray = GetDayWeekFromArray(new Date),
        hoursAndMinutes = GetTime(new Date),

        onClick(),

        <>
            <div className='borderPlace'></div>

            <div className='chioseDayAndDay'>

                <img src='https://i.postimg.cc/zDW8DS7c/clock.png' />

                <h6 style={(storedTheme === "light") ? { color: "white" } :
                    (storedTheme === "dark") ? { color: "GrayText" } : ""}>
                    Day {takeDayAndCodeDayInResultHour.Day}
                </h6>

                <div id="results" className="search-results">

                    <Row xs={2} md={4} lg={4} className="g-4">

                        {Hours.map(hour => {

                            if (dayFromArray == takeDayAndCodeDayInResultHour.Day) {

                                if (hoursAndMinutes > "19:00" && hoursAndMinutes < "23:00"
                                    || dayFromArray == "Friday" && hoursAndMinutes > "14:00") {

                                    Swal.fire({
                                        icon: 'info',
                                        title: `The work day ${dayFromArray} is over 😁`,
                                        html: 'If you want to book an appointment for the day you chose for next week, book tomorrow! ',
                                        toast: true,
                                        position: 'center',
                                        background: `${(storedTheme === "light") ? "#373E44" :
                                            (storedTheme === "dark") ? "" : ""}`,
                                        confirmButtonColor: "green",
                                        color: `${(storedTheme === "light") ? "#ffffffab" :
                                            (storedTheme === "dark") ? "" : ""}`,
                                    })
                                }


                                if (hour.Hour_day >= hoursAndMinutes) {

                                    return (

                                        <div key={hour._id}>
                                            <p href='#'
                                                style={(storedTheme === "light") ? { textDdecoration: "none", color: "white" } :
                                                    (storedTheme === "dark") ? { textDdecoration: "none" } : ""}
                                                onClick={() => saveDateUser(hour.Hour_day, hour._id)}>{hour.Hour_day}
                                            </p>
                                        </div>
                                    )
                                }
                            }


                            else {

                                return (
                                    <div key={hour._id}>
                                        <p href='#'
                                            style={(storedTheme === "light") ? { textDdecoration: "none", color: "white" } :
                                                (storedTheme === "dark") ? { textDdecoration: "none" } : ""}
                                            onClick={() => saveDateUser(hour.Hour_day, hour._id)}>{hour.Hour_day}
                                        </p>
                                    </div>
                                )
                            }
                        }

                        )}
                    </Row>
                </div>
            </div>
        </>
    )



    // save to user date , hour and day what he chiose
    const saveDateUser = async (Hour_day, Serial_code) => {

        let dataHour = { Hour_day, Serial_code }

        sessionStorage.setItem("Hour", JSON.stringify(dataHour))

        let dayLocal = JSON.parse(sessionStorage.getItem("day"));
        let hourLocal = JSON.parse(sessionStorage.getItem("Hour"));


        await UpdateDataUserAddTurn(userDataCode.User_code, userData, dayLocal.Day, hourLocal.Hour_day, hourLocal.Serial_code);
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
        window.location.reload(false);
    }



    // show loading when data from data base come
    if (LoadingDays) {
        return (
            <div className='loadingDaysHour'>
                <img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!f305cw"></img>
            </div>
        )
    }


    return (

        < div >

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
                    {showResults ? <ResultsHours /> : null}
                </Modal.Body>

            </div>
        </div >
    )

}


export default Appointment;