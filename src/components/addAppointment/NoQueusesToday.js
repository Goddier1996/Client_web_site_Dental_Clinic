import React from 'react'


const NoQueusesToday = () => {

    let storedTheme = localStorage.getItem("theme");

    return (
        <div className='writeNotHaveTodayTurn'>
            <h6
                style={(storedTheme === "light") ? { textDdecoration: "none", color: "white" } :
                    (storedTheme === "dark") ? { textDdecoration: "none" } : ""}
            >
                No queues today
                <br /><br />
                A working day is over 😁
            </h6>
        </div>
    )
}

export default NoQueusesToday;