import { Button, Modal, Form } from 'react-bootstrap'
import '../css/home.css'
import React, { useState } from 'react'
import videoBg from '../images/FilmForth Untitled.mp4'
import Category from '../components/category'
import Appointment from '../components/Appointment'
import Swal from 'sweetalert2'
import CloseIcon from '@mui/icons-material/Close';



// Home page
function Home() {


    let storedTheme = localStorage.getItem("theme");

    // show popup add , Appointment
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let userData = JSON.parse(sessionStorage.getItem("user"));



    //here we check if user connect to side , if yes he can click to button book an appointment , else show pop he need login or reg
    const CheckUserConnected = () => {


        if (userData == null && storedTheme === "dark") {

            handleClose();

            Swal.fire({
                icon: 'warning',
                title: 'Login/Register',
                html: 'You need to log in or register, and you should book an appointment',
                toast: true,
                position: 'top-end',
                confirmButtonColor: "green"
            })

            return;
        }


        if (userData == null && storedTheme === "light") {

            handleClose();

            Swal.fire({
                icon: 'warning',
                title: 'Login/Register',
                html: 'You need to log in or register, and you should book an appointment',
                toast: true,
                position: 'top-end',
                background: '#373E44',
                confirmButtonColor: "green",
                color: '#ffffffab',
                buttonColor: '#E96E00'
            })

            return;
        }


        if (storedTheme === "dark" && userData.Day_date != null) {

            handleClose();

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

            handleClose();

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


        if (userData.UserType_code == 2) {

            if (storedTheme == "dark") {

                handleClose();

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

                handleClose();

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


        if (userData != null && userData.Day_date == null) {
            // show popup,Appointment
            handleShow();
        }
    }



    const closePopUpAppintment = () => {

        // handleClose();
        sessionStorage.removeItem("day");
        window.location.reload(false);
    }




    if (storedTheme === "light") {

        return (
            <div>

                <div className='main1'>
                    <video src={videoBg} loop autoPlay muted playsInline />
                    <div className="content">
                        <h1>Welcome</h1>
                        <p>to the Dental Care Clinic</p>
                    </div>
                </div>

                <div className='Click_appointment'>

                    <div className="d-grid gap-2 click">
                        <Button variant="warning" size="sm" onClick={CheckUserConnected}>
                            Click me - Book an appointment
                        </Button>
                    </div>

                    {/* show model popup Appointment */}
                    <div className='bookClick'>
                        <Modal show={show} >

                            <div className='showModelAddAppointmentUserDark'>

                                <div className="closeModelAddAppointmentUser">

                                    <Button style={{ background: "#424242" }} variant="contained" onClick={closePopUpAppintment} >
                                        <CloseIcon style={{ fontSize: "20px", color: "white" }} />
                                    </Button>
                                </div>

                                <div className='titleHeater'>
                                    <img src='https://i.postimg.cc/J0R7Js4X/day.png' />
                                </div>

                                <Form>
                                    <Appointment handleClose={handleClose} />
                                </Form>

                            </div>
                        </Modal>
                    </div>
                </div>

                {/* show all Category from json file */}
                <Category></Category>
            </div>
        );
    }



    if (storedTheme === "dark") {


        return (
            <div>

                <div className='main1'>
                    <video src={videoBg} loop autoPlay muted playsInline />
                    <div className="content">
                        <h1>Welcome</h1>
                        <p>to the Dental Care Clinic</p>
                    </div>
                </div>

                <div className='Click_appointment'>

                    <div className="d-grid gap-2 click">
                        <Button variant="success" size="sm" onClick={CheckUserConnected}>
                            Click me - Book an appointment
                        </Button>
                    </div>


                    {/* show model popup Appointment */}
                    <div className='bookClick'>
                        <Modal show={show} >

                            <div className='showModelAddAppointmentUser'>

                                <div className="closeModelAddAppointmentUser">
                                    <Button style={{ background: "white" }} variant="contained" onClick={closePopUpAppintment} >
                                        <CloseIcon style={{ fontSize: "20px", color: "black" }} />
                                    </Button>
                                </div>

                                <div className='titleHeater'>
                                    <img src='https://i.postimg.cc/J0R7Js4X/day.png' />
                                </div>

                                <Form>
                                    <Appointment handleClose={handleClose} />
                                </Form>

                            </div>
                        </Modal>
                    </div>
                </div>

                {/* show all Category from json file */}
                <Category></Category>
            </div>
        );
    }

}

export default Home;