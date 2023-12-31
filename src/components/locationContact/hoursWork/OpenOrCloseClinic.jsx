import React, { useState, useEffect } from 'react'
import { GetDayWeekFromArray, GetTime } from "../../addAppointment/function/AlertUserHaveTurnToday"


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
                <img src='https://i.postimg.cc/yYsNwvQB/openn.webp' alt='open' />
                :
                <img src='https://i.postimg.cc/FzZhrXWv/closee.webp' alt='close' />
            }
        </div>
    )
}

export default OpenOrCloseClinic;