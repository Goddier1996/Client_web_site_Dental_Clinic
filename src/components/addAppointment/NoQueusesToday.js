import React from 'react'


const NoQueusesToday = () => {

    let storedTheme = localStorage.getItem("theme");

    return (
        <div className='writeNotHaveTodayTurn'>
            <h6
                style={(storedTheme === "light") ? { textDdecoration: "none", color: "white" } :
                    (storedTheme === "dark") ? { textDdecoration: "none" } : ""}
            >
                Working day is over , No queues today 🕒
            </h6>
        </div>
    )
}

export default NoQueusesToday;