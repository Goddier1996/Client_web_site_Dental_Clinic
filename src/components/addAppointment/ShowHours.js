import React from 'react'


const ShowHours = ({ hours, ShowPopUpReCAPTCHA }) => {

    const { Hour_day } = hours;

    let storedTheme = localStorage.getItem("theme");


    return (
        <>
            <p href='#'
                style={(storedTheme === "light") ? { textDdecoration: "none", color: "white" } :
                    (storedTheme === "dark") ? { textDdecoration: "none" } : ""}
                onClick={ShowPopUpReCAPTCHA}>{Hour_day}
            </p>
        </>
    )
}

export default ShowHours;