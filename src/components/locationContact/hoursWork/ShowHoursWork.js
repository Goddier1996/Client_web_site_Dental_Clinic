import React from 'react'
import { motion as m } from "framer-motion/dist/framer-motion"
import { item } from "../../../styleComponents/StyleAnimation"
import date from '../../../Json_date/date.json'


const ShowHoursWork = () => {

    return (
        <>
            {date.hours_work.map((record) => (

                <m.div variants={item} key={record.id}>
                    <p>{record.day} : {record.time}</p>
                </m.div>
            ))}
        </>
    )
}

export default ShowHoursWork;