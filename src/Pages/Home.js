import { Button, Modal, Form } from 'react-bootstrap'
import '../css/home.css'
import React, { useState } from 'react'
import videoBg from '../images/FilmForth Untitled.mp4'
import Category from '../components/category'
import Appointment from '../components/Appointment'
import Swal from 'sweetalert2'



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

        if (userData != null) {
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
                        <Modal show={show} style={{ background: "rgba(0, 0, 0, 0.85)" }}>
                            {/* onHide={closePopUpAppintment} */}
                            <p className="closes" onClick={closePopUpAppintment} aria-label="Close">
                                &times;
                            </p>

                            <Modal.Header className='titleHeater'>
                                <Modal.Title>
                                    <h1>Select day 🗓️</h1>
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Form>
                                    <Appointment handleClose={handleClose} />
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </div>

                </div>
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
                        <Modal show={show} style={{ background: "rgba(0, 0, 0, 0.85)" }}>
                            {/* onHide={closePopUpAppintment} */}
                            <p className="closes" onClick={closePopUpAppintment} aria-label="Close">
                                &times;
                            </p>

                            <Modal.Header className='titleHeater'>
                                <Modal.Title>
                                    <h1>Select day 🗓️</h1>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Appointment handleClose={handleClose} />
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </div>

                </div>
                <Category></Category>
            </div>
        );
    }

}

export default Home;