import React from 'react'


const ShowWhatDayToday = ({ takeDayAndCodeDayInResultHour }) => {


    let storedTheme = localStorage.getItem("theme");

    return (
        <>
            <img src='https://i.postimg.cc/bv30tZZS/z2.webp' alt='clock' />

            <h6 style={(storedTheme === "light") ? { color: "white" } :
                (storedTheme === "dark") ? { color: "GrayText" } : ""}>
                Day {takeDayAndCodeDayInResultHour}
            </h6>
        </>
    )
}

export default ShowWhatDayToday;