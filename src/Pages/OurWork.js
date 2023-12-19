import React from 'react'
import date from '../Json_date/date.json'
import '../css/ourWork.css'
import { Row } from 'react-bootstrap'
import { motion as m } from "framer-motion/dist/framer-motion"
import ShowOurWorkClinic from '../components/ourWork/ShowOurWorkClinic'



//show data from json file our work this clinic
function ourWork() {


    let storedTheme = localStorage.getItem("theme");

    return (

        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
        >
            <div className='styleOurWorksModel'>

                <div className={(storedTheme == "light") ? "titleOurWorkDark" : (storedTheme == "dark") ? "titleOurWork" : ""}>
                    <br />
                    <h1>Service We Perform at The Clinic</h1>
                    <p>* if you need Other Service<br /> <a href='/Location'>Click Move To Page Contact</a></p>
                </div>


                <div className='OurWorkLook'>
                    <Row xs={1} md={2} lg={3} style={{ width: "100%" }}>
                        {date.work.map((record) => (

                            <ShowOurWorkClinic infoOurWork={record} />
                        ))}
                    </Row>
                </div>
            </div>

        </m.div>
    )
}

export default ourWork;