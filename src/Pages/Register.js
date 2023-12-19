import React from 'react'
import '../css/register.css'
import { motion as m } from "framer-motion/dist/framer-motion"
import UserRegister from '../../src/components/register/UserRegister';



function Register() {


    let storedTheme = localStorage.getItem("theme");


    return (

        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
        >
            <section className="banner1">

                <div className={(storedTheme == "light") ? "box1 contect1Dark" : (storedTheme == "dark") ? "box1 contect1" : ""}>

                    <div className={(storedTheme == "light") ? "log1Dark" : (storedTheme == "dark") ? "log1" : ""}>

                        <UserRegister />

                    </div>
                </div>

                <div className="box1 image1"></div>
            </section>
        </m.div>
    )
}


export default Register;