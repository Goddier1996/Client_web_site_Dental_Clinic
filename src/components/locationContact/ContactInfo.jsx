import React from 'react'
import { motion as m } from "framer-motion/dist/framer-motion"
import { item } from "../../styleComponents/StyleAnimation"
import date from '../../Json_date/date.json'


const ContactInfo = () => {

    let storedTheme = localStorage.getItem("theme");

    return (
        <>
            <m.p variants={item}><span className={(storedTheme == "light") ? "boldFirstWordDark" : (storedTheme == "dark") ? "boldFirstWord" : ""}>
                City :</span> {date.Map.country} , {date.Map.City}
            </m.p>
            <m.p variants={item}><span className={(storedTheme == "light") ? "boldFirstWordDark" : (storedTheme == "dark") ? "boldFirstWord" : ""}>
                Street :</span> {date.Map.addressCity} , {date.Map.adressNum}
            </m.p>
            <m.p variants={item}><span className={(storedTheme == "light") ? "boldFirstWordDark" : (storedTheme == "dark") ? "boldFirstWord" : ""}>
                Email :</span> artium@gmail.com
            </m.p>
            <m.p variants={item}><span className={(storedTheme == "light") ? "boldFirstWordDark" : (storedTheme == "dark") ? "boldFirstWord" : ""}>
                Phone :</span> +972 5489302343
            </m.p>
        </>
    )
}

export default ContactInfo;