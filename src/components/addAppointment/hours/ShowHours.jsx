import React from 'react'
import '../appointment.css'


const ShowHours = ({ hours, ShowPopUpReCAPTCHA }) => {

    const { Hour_day, IsActive } = hours;

    let storedTheme = localStorage.getItem("theme");


    return (
        <div className={IsActive == "1" ? "hourActive" : "hourNotActive"}>

            <p
                style={(storedTheme === "light") ? { textDdecoration: "none", color: "white" } :
                    (storedTheme === "dark") ? { textDdecoration: "none" } : ""}
                onClick={IsActive == "1" ? ShowPopUpReCAPTCHA : ""}>{Hour_day}
            </p>

        </div>
    )
}


export default ShowHours;