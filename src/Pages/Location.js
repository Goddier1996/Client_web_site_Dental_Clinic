import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import '../css/loction.css'
import { Modal } from 'react-bootstrap';
import SendEmail from '../components/locationContact/SendEmail'
import { motion as m } from "framer-motion/dist/framer-motion"
import { container } from "../styleComponents/StyleAnimation"
import ContactInfo from '../components/locationContact/ContactInfo';
import ShowHoursWork from '../components/locationContact/hoursWork/ShowHoursWork';
import ButtonSendEmail from '../components/locationContact/ButtonSendEmail';
import CalcDistanceToClinic from '../components/locationContact/map/CalcDistanceToClinic';
import ShowMap from '../components/locationContact/map/ShowMap';
import OpenOrCloseClinic from '../components/locationContact/hoursWork/OpenOrCloseClinic';



//here we show Location the clinic , send message + show data from json file
function Location() {


    let storedTheme = localStorage.getItem("theme");

    // show popup send message
    const [showSendMessage, setShowSendMessage] = useState(false);


    const popUpSendMessage = () => {
        setShowSendMessage(true);
    }



    const closePopUpModelSendMessage = () => {
        setShowSendMessage(false);
    }



    return (

        <m.div variants={container} initial="hidden" animate="show">
            <section className="bannerLoction">

                <div className={(storedTheme == "light") ? "boxLoctionDark" : (storedTheme == "dark") ? "boxLoction" : ""}>

                    <h3>Contact</h3>
                    <ContactInfo />

                    <br />

                    {/* Button send mail */}
                    <ButtonSendEmail popUpSendMessage={popUpSendMessage} />

                    {/* pop up show email input value and send */}
                    <Modal show={showSendMessage} onHide={closePopUpModelSendMessage} >
                        <SendEmail hideModelSendMessage={closePopUpModelSendMessage} />
                    </Modal>


                    {/* here show distance go to clinic from user location */}
                    <CalcDistanceToClinic />

                    <ShowMap />

                </div>



                <div className={(storedTheme == "light") ? "box contectDark" : (storedTheme == "dark") ? "box contect" : ""}>

                    <div className={(storedTheme == "light") ? "logDark" : (storedTheme == "dark") ? "log" : ""}>
                        <h3>Hours Work Clinic</h3>

                        <OpenOrCloseClinic />

                        <ShowHoursWork />

                        <br />
                        <br />
                        <Card.Img variant="top" src="https://i.postimg.cc/508kqF22/1zx.png" />
                        <br />
                        <br />
                    </div>
                </div>
            </section>
        </m.div>
    )
}

export default Location;