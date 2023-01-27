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
    const [showModelAppointment, setShowModelAppointment] = useState(false);
    const handleCloseModelAppointment = () => setShowModelAppointment(false);
    const handleShowModelAppointment = () => setShowModelAppointment(true);

    let userData = JSON.parse(sessionStorage.getItem("user"));




    const CheckUserConnected = () => {

        if (userData != null && userData.Day_date == null && userData.UserType_code == 1) {
            // show popup,Appointment
            handleShowModelAppointment();
        }

        else {

            Swal.fire({
                icon: 'warning',
                html: `${(userData == null) ? 'You need to LogIn / Register, and you should book an appointment' :
                    (userData.Day_date != null) ? 'You have an Appointment, Cancel it and book a new Appointment' :
                        (userData.UserType_code == 2) ? 'you are Doctor (You can not book an appointment) !' :
                            (userData.UserType_code == 3) ? 'you are Admin (You can not book an appointment) !' : ""}`,
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
                        style={(storedTheme === "light") ? { color: "rgba(0, 0, 0, 0.58)" } :
                            (storedTheme === "dark") ? { color: "#ffffff" } : ""}
                        size="sm"
                        onClick={CheckUserConnected}>
                        Click me - Book an Appointment <img style={{ height: "30px" }} src='https://i.postimg.cc/MGZ8B27m/pngwing-com-2.png' />
                    </Button>
                </div>


                {/* show model popup Appointment */}
                <div className='bookClick'>
                    <Modal show={showModelAppointment} >

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
                                <Appointment handleClose={handleCloseModelAppointment} />
                            </Form>

                        </div>
                    </Modal>
                </div>
            </div >



            {/* show all Category from json file */}
            < Category />
        </div >
    )

}

export default Home;