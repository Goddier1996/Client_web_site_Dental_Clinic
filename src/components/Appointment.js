import React, { useState, useEffect } from 'react'
import { API } from '../Api/API';
import { Button, Row, Modal } from 'react-bootstrap';
import '../css/appointment.css'
import Swal from 'sweetalert2'
import { LoadDays } from '../Api/LoadDataFromApi'
import { DeleteHour, UpdateDataUserAddTurn } from '../Api/DeleteUpdateDataFromApi'



//here component we show data from data base (if you click to buttom in Home Page Book an appointment)
function Appointment(props) {

    const [Days, SetDays] = useState([])
    const [Hours, setHours] = useState([])


    //show a pop up day and hour
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)


    // check in ResultsHours function today , which hours work and free today
    let takeDayAndCodeDayInResultHour;
    let date = new Date();
    let takeDay = date.getDay();
    const hoursAndMinutes = date.getHours() + ':' + '00';
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayFromArray;


    // all data what we save in local storage and seesion storge
    let storedTheme = localStorage.getItem("theme");

    let userData = JSON.parse(sessionStorage.getItem("user"));

    let userDataCode = JSON.parse(sessionStorage.getItem("userCode"));




    // load data Appointmen days,hours from LoadDataFromApi component
    const LoadDataAppointmentFromApi = async () => {

        SetDays(await LoadDays())
    }



    //here you show Hours from day what we chiose , from data base 
    const LoadHours = async (Serial_code, Day_date) => {

        let res = await fetch(`${API.HOURS.GET}/${Serial_code}`, { method: 'GET' });
        let data = await res.json();

        setHours(data);

        let dataDay = { Day: Day_date }

        sessionStorage.setItem("day", JSON.stringify(dataDay));

        ResultsHours();
    }



    //show (jsx) return we see in pup up hours - and click to hour we save what day we chiose and hour to data base
    const ResultsHours = () => (

        takeDayAndCodeDayInResultHour = JSON.parse(sessionStorage.getItem("day")),
        dayFromArray = weekday[takeDay],

        onClick(),

        <>
            <div className='borderPlace'></div>

            <div className='chioseDayAndDay'>

                <img src='https://i.postimg.cc/zDW8DS7c/clock.png' />
                <h6 style={{ color: "GrayText" }}>Day {takeDayAndCodeDayInResultHour.Day}</h6>


                <div id="results" className="search-results">

                    <Row xs={2} md={4} lg={4} className="g-4">

                        {Hours.map(hour => {

                            if (storedTheme == "dark") {

                                if (dayFromArray == takeDayAndCodeDayInResultHour.Day) {


                                    if (hour.Hour_day > hoursAndMinutes) {
                                        return (

                                            <div key={hour._id}>
                                                <p href='#'
                                                    style={{ textDdecoration: "none" }}
                                                    onClick={() => saveDateUser(hour.Hour_day, hour._id)}>{hour.Hour_day}
                                                </p>
                                            </div>
                                        )
                                    }


                                    if (hour.Hour_day >= "19:00" && hour.Hour_day <= "23:00"
                                        ||
                                        takeDayAndCodeDayInResultHour.Day == "Friday" && hour.Hour_day >= "14:00") {

                                        if (storedTheme == "dark") {
                                            Swal.fire({
                                                icon: 'info',
                                                title: `The work day ${dayFromArray} is over 😁`,
                                                html: 'If you want to book an appointment for the day you chose for next week, book tomorrow! ',
                                                toast: true,
                                                position: 'center',
                                                confirmButtonColor: "green",
                                            })
                                        }

                                        if (storedTheme == "light") {
                                            Swal.fire({
                                                icon: 'info',
                                                title: `The work day ${dayFromArray} is over 😁`,
                                                html: 'If you want to book an appointment for the day you chose for next week, book tomorrow! ',
                                                toast: true,
                                                position: 'center',
                                                background: '#373E44',
                                                confirmButtonColor: "green",
                                                color: '#ffffffab',
                                            })
                                        }

                                    }
                                }


                                else {

                                    return (
                                        <div key={hour._id}>
                                            <p href='#'
                                                style={{ textDdecoration: "none" }}
                                                onClick={() => saveDateUser(hour.Hour_day, hour._id)}>{hour.Hour_day}
                                            </p>
                                        </div>
                                    )
                                }
                            }


                            if (storedTheme == "light") {

                                if (dayFromArray == takeDayAndCodeDayInResultHour.Day) {


                                    if (hour.Hour_day > hoursAndMinutes) {
                                        return (

                                            <div key={hour._id}>
                                                <p href='#'
                                                    style={{ textDdecoration: "none", color: "white" }}
                                                    onClick={() => saveDateUser(hour.Hour_day, hour._id)}>{hour.Hour_day}
                                                </p>
                                            </div>
                                        )
                                    }


                                    if (hour.Hour_day >= "19:00" && hour.Hour_day <= "23:00"
                                        ||
                                        takeDayAndCodeDayInResultHour.Day == "Friday" && hour.Hour_day >= "14:00") {

                                        if (storedTheme == "dark") {
                                            Swal.fire({
                                                icon: 'info',
                                                title: `The work day ${dayFromArray} is over 😁`,
                                                html: 'If you want to book an appointment for the day you chose for next week, book tomorrow! ',
                                                toast: true,
                                                position: 'center',
                                                confirmButtonColor: "green",
                                            })
                                        }

                                        if (storedTheme == "light") {
                                            Swal.fire({
                                                icon: 'info',
                                                title: `The work day ${dayFromArray} is over 😁`,
                                                html: 'If you want to book an appointment for the day you chose for next week, book tomorrow! ',
                                                toast: true,
                                                position: 'center',
                                                background: '#373E44',
                                                confirmButtonColor: "green",
                                                color: '#ffffffab',
                                            })
                                        }

                                    }
                                }


                                else {

                                    return (
                                        <div key={hour._id}>
                                            <p href='#'
                                                style={{ textDdecoration: "none", color: "white" }}
                                                onClick={() => saveDateUser(hour.Hour_day, hour._id)}>{hour.Hour_day}
                                            </p>
                                        </div>
                                    )
                                }
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


        if (storedTheme === "dark") {

            await Swal.fire({
                title: `Youre making an appointment`,
                text: `${dayLocal.Day} ${hourLocal.Hour_day}`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                // toast: true,
                position: 'center'
            })
            await sessionStorage.clear();
            window.location.reload(false);
        }


        if (storedTheme === "light") {

            await Swal.fire({
                title: `Youre making an appointment`,
                text: `${dayLocal.Day} ${hourLocal.Hour_day}`,
                icon: 'success',
                background: '#373E44',
                color: '#ffffffab',
                buttonColor: '#E96E00',
                showConfirmButton: false,
                timer: 1500,
                // toast: true,
                position: 'center'
            })
            await sessionStorage.clear();
            window.location.reload(false);
        }
    }




    //here we to do check if user have a hour he dont can chiose a new hour and day , he need to delete data what he was
    useEffect(() => {

        if (storedTheme === "dark" && userData.Day_date != null) {

            props.handleClose();

            Swal.fire({
                title: 'You have an appointment, cancel it and book a new appointment',
                icon: 'warning',
                toast: true,
                position: 'top-end',
                confirmButtonColor: "green"
            }).then((result) => {

                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })
        }


        if (storedTheme === "light" && userData.Day_date != null) {

            props.handleClose();

            Swal.fire({
                title: 'You have an appointment, cancel it and book a new appointment',
                icon: 'warning',
                background: '#373E44',
                color: '#ffffffab',
                toast: true,
                position: 'top-end',
                confirmButtonColor: "green"
            }).then((result) => {

                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })
        }


        if (userData.Day_date == null) {
            LoadDataAppointmentFromApi();
        }


        if (userData.UserType_code == 2) {

            if (storedTheme == "dark") {

                props.handleClose();

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'you are doctor (You can not book an appointment) !',
                    toast: true,
                    position: 'top-end',
                    confirmButtonColor: "green"
                }).then((result) => {

                    if (result.isConfirmed) {
                        window.location.reload(false);
                    }
                })
            }


            if (storedTheme == "light") {

                props.handleClose();

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'you are doctor (You can not book an appointment) !',
                    toast: true,
                    position: 'top-end',
                    confirmButtonColor: "green",
                    background: '#373E44',
                    color: '#ffffffab',
                }).then((result) => {

                    if (result.isConfirmed) {
                        window.location.reload(false);
                    }
                })
            }

        }

    }, [])



    if (storedTheme == "dark") {

        return (
            <div>

                <div className='showDay'>
                    <Row xs={2} md={5} lg={4} className="g-4">

                        {Days.map(day =>

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
            </div>
        );
    }



    if (storedTheme == "light") {

        return (
            <div>

                <div className='showDayDark'>
                    <Row xs={2} md={5} lg={4} className="g-4">

                        {Days.map(day =>

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
            </div>
        );
    }

}


export default Appointment;