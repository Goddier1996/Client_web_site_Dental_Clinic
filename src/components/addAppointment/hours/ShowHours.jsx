import React from 'react'
import '../appointment.css'


const ShowHours = ({ hours, ShowPopUpReCAPTCHA }) => {


    let storedTheme = localStorage.getItem("theme");

    return (
        <div className={hours.IsActive == "1" ? "hourActive" : "hourNotActive"}>
            <p
                style={(storedTheme === "light") ? { textDdecoration: "none", color: "white" } :
                    (storedTheme === "dark") ? { textDdecoration: "none" } : ""}
                onClick={hours.IsActive == "1" ? ShowPopUpReCAPTCHA : ""}>{hours.Hour_day}
            </p>
        </div>
    )
}


export default ShowHours;