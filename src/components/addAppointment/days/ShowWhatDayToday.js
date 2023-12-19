import React from 'react'


const ShowWhatDayToday = ({ takeDayAndCodeDayInResultHour }) => {


    let storedTheme = localStorage.getItem("theme");

    return (
        <>
            <img src='https://i.postimg.cc/zDW8DS7c/clock.png' />

            <h6 style={(storedTheme === "light") ? { color: "white" } :
                (storedTheme === "dark") ? { color: "GrayText" } : ""}>
                Day {takeDayAndCodeDayInResultHour.Day}
            </h6>
        </>
    )
}

export default ShowWhatDayToday;