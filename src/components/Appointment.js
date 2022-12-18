import React from 'react'
import { API } from '../API';
import { useState, useEffect } from "react";
import { Button, Row, Modal, Form } from 'react-bootstrap';
import '../css/appointment.css'
import Swal from 'sweetalert2'


//here component we show data from data base (if you click to buttom in Home Page Book an appointment)
function appointment() {

    const [Days, SetDays] = useState([])
    const [Hours, setHours] = useState([])


    //show a pop up day and hour
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)


    // all data what we save in local storage and seesion storge
    let storedTheme = localStorage.getItem("theme");

    let userData = JSON.parse(sessionStorage.getItem("user"));

    let userDataCode = JSON.parse(sessionStorage.getItem("userCode"));




    //here you show Days , from data base
    const LoadDays = async () => { // 1

        let res = await fetch(API.DAYS.GET, { method: 'GET' });
        let data = await res.json();

        SetDays(data);
    }



    //here you show Hours from day what we chiose , from data base 
    const LoadHours = async (Serial_code, Day_date) => { // 2

        let res = await fetch(`${API.HOURS.GET}/${Serial_code}`, { method: 'GET' });
        let data = await res.json();

        setHours(data);

        let dataDay = { Day_date }

        sessionStorage.setItem("day", JSON.stringify(dataDay))//1

        ResultsHours()
    }



    //show (html) return we see in pup up hours - and click to hour we save what day we chiose and hour to data base
    const ResultsHours = () => ( // 3

        onClick(),

        <div className='chioseDayAndDay'>

            <h6>Chiose Hour Please :</h6>

            <div id="results" className="search-results">

                <Row xs={2} md={4} lg={4} className="g-4">
                    {Hours.map(hour =>
                        <>
                            <p href='#'
                                style={{ textDdecoration: "none" }}
                                onClick={() => saveDateUser(hour.Hour_day, hour._id)}>{hour.Hour_day}
                            </p>
                        </>
                    )}
                </Row>
            </div>
        </div>

    )



    //here we delete the hour from data base , user chiose day and hour
    const DeleteHour = async (Id) => {// 5
        // alert(Id)
        await fetch(`${API.HOURS.GET}/NotActive/${Id}`,
            { method: 'PATCH' }
        );
    }



    // save to user date , hour and day what he chiose
    const saveDateUser = async (Hour_day, Serial_code) => { // 4

        let dataHour = { Hour_day, Serial_code }//2

        sessionStorage.setItem("Hour", JSON.stringify(dataHour))//3

        let dayLocal = JSON.parse(sessionStorage.getItem("day"));//4
        let hourLocal = JSON.parse(sessionStorage.getItem("Hour"));//5


        try {

            let user = {
                FirstName: userData.FirstName,
                User_Login: userData.User_Login,
                Birthday: userData.Birthday,
                Email: userData.Email,
                User_password: userData.User_password,
                UserType_code: "1",
                Confirm_password: userData.Confirm_password,
                Day_date: dayLocal.Day_date,
                Hour_day: hourLocal.Hour_day,
                Serial_codeHour: hourLocal.Serial_code
            }

            await fetch(`${API.USERS.GET}/${userDataCode.User_code}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });


            // sessionStorage.setItem("user", JSON.stringify(user))//6

            DeleteHour(hourLocal.Serial_code);//7
            sessionStorage.removeItem('Hour');//8
            sessionStorage.removeItem('day');//9



            if (storedTheme === "dark") {

                await Swal.fire({
                    title: 'Youre making an appointment',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1200,
                })
                await sessionStorage.clear();
                window.location.reload(false);
            }


            if (storedTheme === "light") {

                await Swal.fire({
                    title: 'Youre making an appointment',
                    icon: 'success',
                    background: '#373E44',
                    color: '#ffffffab',
                    buttonColor: '#E96E00',
                    showConfirmButton: false,
                    timer: 1200,
                })
                await sessionStorage.clear();
                window.location.reload(false);
            }


        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })

            console.log(error)
        }
    }




    //here we to do check if user have a hour he dont can chiose a new hour and day , he need to delete data what he was
    useEffect(() => {

        if (storedTheme === "dark" && userData.Day_date != null) {

            Swal.fire({
                title: 'You have an appointment, cancel it and book a new appointment',
                icon: 'warning',
                toast: true,
                position: 'top-end'
            }).then((result) => {

                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })
        }

        if (storedTheme === "light" && userData.Day_date != null) {

            Swal.fire({
                title: 'You have an appointment, cancel it and book a new appointment',
                icon: 'warning',
                background: '#373E44',
                color: '#ffffffab',
                toast: true,
                position: 'top-end'
            }).then((result) => {

                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })
        }

        if (userData.Day_date == null) {
            LoadDays();
        }

        if (userData.UserType_code == 2) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'you are doctor (You can not book an appointment) !',
            }).then((result) => {

                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })
        }

        if (userData.UserType_code == 3) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'you are Admin (You can not book an appointment) !',
            }).then((result) => {

                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })
        }

    }, [])




    return (
        <div>

            <div className='showDay'>
                <Row xs={2} md={5} lg={4} className="g-4">

                    {Days.map(day =>

                        <Button size="sm" variant="outline-light"
                            onClick={() => LoadHours(day.Serial_code, day.Day_date)}>
                            {day.Day_date}
                        </Button>
                    )}
                </Row>


                <Modal.Body>
                    <Form>
                        {showResults ? <ResultsHours /> : null}
                    </Form>
                </Modal.Body>

            </div>
            <div>
            </div>
        </div>
    );
}


export default appointment;