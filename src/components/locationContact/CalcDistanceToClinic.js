import React, { useState } from 'react'


const CalcDistanceToClinic = () => {

    const haversine = require('haversine')

    const [distance, setDistance] = useState("")

    let storedTheme = localStorage.getItem("theme");


    const end = {
        latitude: 32.31822,
        longitude: 34.93413
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {

            setDistance(haversine(position.coords, end, { unit: 'km' }))
        },
        () => {
            console.log("Position could not be determined.")
        }
    );




    return (
        <div className={distance ? 'styleDistance' : ""}>
            <p>
                <span className={(storedTheme == "light") ? "boldFirstWordDark" : (storedTheme == "dark") ? "boldFirstWord" : ""}>
                    Distance to the clinic from your place : </span>

                {!distance ?
                    <><br /><b className='confirmLocation' style={{ color: "red" }}>Confirm your location sharing !</b></>
                    :
                    distance == Math.floor(distance) || distance >= 1 ?
                        <>{parseFloat(distance).toFixed(0)} Km</>
                        :
                        distance < 1 ?
                            <>{parseFloat(distance).toFixed(3)} Meters</>
                            :
                            !distance ?
                                <><br />Your location data was not received,<br />please share your location.</> : ""
                }
            </p>
        </div>
    )
}

export default CalcDistanceToClinic;