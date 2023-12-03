import '../css/home.css'
import React, { useState } from 'react'
import Category from '../components/homeOptions/Category'
import Swal from 'sweetalert2'
import { motion as m } from "framer-motion/dist/framer-motion"
import { container, item } from "../styleComponents/StyleAnimation"
import ButtonAppointment from '../components/homeOptions/ButtonAppointment'
import PopUpAppointment from '../components/homeOptions/PopUpAppointment'



function Home() {


    let storedTheme = localStorage.getItem("theme");

    // show popup add , Appointment
    const [showModelAppointment, setShowModelAppointment] = useState(false);
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



    const closePopUpAppointment = () => {

        sessionStorage.removeItem("day");
        window.location.reload(false);
    }



    return (

        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
        >

            <div className='main1'>
                <img src='https://i.postimg.cc/KzGWXd0Z/5901203-2009.jpg' />
                <m.div variants={container} initial="hidden" animate="show" className="content">
                    <m.h1 variants={item}>Welcome</m.h1>
                    <m.p variants={item}>Dental Care Clinic</m.p>
                    <br />
                </m.div>
            </div>


            <div className='Click_appointment'>

                <ButtonAppointment CheckUserConnectedFunc={CheckUserConnected} />

                {/* show model popup Appointment */}
                <PopUpAppointment showModelAppointment={showModelAppointment} closePopUpAppointment={closePopUpAppointment} />

            </div >


            {/* show all Category from json file */}
            < Category />

        </m.div >
    )
}

export default Home;