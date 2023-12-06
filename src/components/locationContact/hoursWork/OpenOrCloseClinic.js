import React, { useState, useEffect } from 'react'
import { GetTime, GetDayWeekFromArray } from "../../addAppointment/AlertUserHaveTurnToday"


const OpenOrCloseClinic = () => {

    const [openOrClose, setOpenOrClose] = useState(false);

    let hoursAndMinutes;
    let day;


    useEffect(() => {

        hoursAndMinutes = GetTime(new Date);
        day = GetDayWeekFromArray(new Date);

        {
            day == "Saturday" ?
                setOpenOrClose(false) :

                day == "Friday" && hoursAndMinutes >= "10:00" && hoursAndMinutes < "14:00" ?
                    setOpenOrClose(true) :

                    hoursAndMinutes >= "10:00" && hoursAndMinutes < "19:00" ?
                        setOpenOrClose(true) :

                        setOpenOrClose(false)
        }

    }, [openOrClose])



    return (
        <div className='openOrCloseClinic'>
            {openOrClose ?
                <p className={openOrClose ? "openClinic" : ""}>Clinic Open Now</p> :
                <p className={!openOrClose ? "closeClinic" : ""}>Clinic Close Now</p>
            }
        </div>
    )
}

export default OpenOrCloseClinic;