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


        if (userData == null) {

            Swal.fire({
                icon: 'warning',
                title: 'Login / Register',
                html: 'You need to log in or register, and you should book an appointment',
                toast: true,
                position: 'top-end',
                confirmButtonColor: "green",
                background: `${(storedTheme === "light") ? "#373E44" :
                    (storedTheme === "dark") ? "" : ""}`,
                color: `${(storedTheme === "light") ? "#ffffffab" :
                    (storedTheme === "dark") ? "" : ""}`,
                buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                    (storedTheme === "dark") ? "" : ""}`
            })
            return;
        }



        if (userData.Day_date != null) {

            Swal.fire({
                title: 'You have an appointment, cancel it and book a new appointment',
                icon: 'warning',
                toast: true,
                position: 'top-end',
                confirmButtonColor: "green",
                background: `${(storedTheme === "light") ? "#373E44" :
                    (storedTheme === "dark") ? "" : ""}`,
                color: `${(storedTheme === "light") ? "#ffffffab" :
                    (storedTheme === "dark") ? "" : ""}`,
                buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                    (storedTheme === "dark") ? "" : ""}`
            })
            return;
        }



        if (userData.UserType_code == 2) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'you are doctor (You can not book an appointment) !',
                toast: true,
                position: 'top-end',
                confirmButtonColor: "green",
                background: `${(storedTheme === "light") ? "#373E44" :
                    (storedTheme === "dark") ? "" : ""}`,
                color: `${(storedTheme === "light") ? "#ffffffab" :
                    (storedTheme === "dark") ? "" : ""}`,
                buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                    (storedTheme === "dark") ? "" : ""}`
            })
            return;
        }



        if (userData != null && userData.Day_date == null) {
            // show popup,Appointment
            handleShow();
        }
    }



    const closePopUpAppintment = () => {

        sessionStorage.removeItem("day");
        window.location.reload(false);
    }



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
                    <Button
                        variant={(storedTheme === "light") ? "warning" :
                            (storedTheme === "dark") ? "success" : ""}
                        size="sm"
                        onClick={CheckUserConnected}>
                        Click me - Book an appointment
                    </Button>
                </div>


                {/* show model popup Appointment */}
                <div className='bookClick'>
                    <Modal show={show} >

                        <div className={(storedTheme === "light") ? "showModelAddAppointmentUserDark" : (storedTheme === "dark") ? "showModelAddAppointmentUser" : ""}>

                            <div className="closeModelAddAppointmentUser">

                                <Button
                                    style={(storedTheme === "light") ? { background: "#424242" } :
                                        (storedTheme === "dark") ? { background: "white" } : ""}
                                    variant="contained"
                                    onClick={closePopUpAppintment} >

                                    <CloseIcon style={(storedTheme === "light") ? { fontSize: "#20px", color: "white" } :
                                        (storedTheme === "dark") ? { fontSize: "#20px", color: "black" } : ""} />
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
            </div >



            {/* show all Category from json file */}
            < Category ></Category >
        </div >
    )

}

export default Home;