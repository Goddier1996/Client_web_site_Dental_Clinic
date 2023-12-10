import React, { useState, useEffect } from 'react'
import { GetDayWeekFromArray, GetTime } from "../../addAppointment/AlertUserHaveTurnToday"


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

                    day != "Friday" && hoursAndMinutes >= "10:00" && hoursAndMinutes < "19:00" ?
                        setOpenOrClose(true) :

                        setOpenOrClose(false)
        }

    }, [openOrClose])



    return (
        <div className='openOrCloseClinic'>
            {openOrClose ?
                // <p className={openOrClose ? "openClinic" : ""}>Clinic Open Now</p>
                <img src='https://i.postimg.cc/q7j5hYhc/open.png' /> :
                // <p className={!openOrClose ? "closeClinic" : ""}>Clinic Close Now</p>
                <img src='https://i.postimg.cc/KvPMx3HL/closed-sign.png' />
            }
        </div>
    )
}

export default OpenOrCloseClinic;