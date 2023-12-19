import React from 'react'


const NoQueusesToday = () => {

    let storedTheme = localStorage.getItem("theme");

    return (
        <>
            <div className='writeNotHaveTodayTurn'>
                <h6
                    style={(storedTheme === "light") ? { textDdecoration: "none", color: "white" } :
                        (storedTheme === "dark") ? { textDdecoration: "none" } : ""}
                >
                    Working day is over
                </h6>

            </div>

            <div className='closeClinicToday'>
                <img src='https://i.postimg.cc/KvPMx3HL/closed-sign.png' />
            </div>
        </>
    )
}

export default NoQueusesToday;