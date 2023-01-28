import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import '../css/loction.css'
import date1 from '../Json_date/date.json'
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import { Modal } from 'react-bootstrap';
import SendEmail from '../components/SendEmail'
import { motion as m } from "framer-motion/dist/framer-motion"
import { container, item } from "../styleComponents/StyleAnimation"



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

                    <h3>Contact :</h3>

                    <m.p variants={item}><span className={(storedTheme == "light") ? "boldFirstWordDark" : (storedTheme == "dark") ? "boldFirstWord" : ""}>
                        City :</span> {date1.Map.country} , {date1.Map.City}
                    </m.p>
                    <m.p variants={item}><span className={(storedTheme == "light") ? "boldFirstWordDark" : (storedTheme == "dark") ? "boldFirstWord" : ""}>
                        Street :</span> {date1.Map.addressCity} , {date1.Map.adressNum}
                    </m.p>
                    <m.p variants={item}><span className={(storedTheme == "light") ? "boldFirstWordDark" : (storedTheme == "dark") ? "boldFirstWord" : ""}>
                        Email :</span> artium@gmail.com
                    </m.p>
                    <m.p variants={item}><span className={(storedTheme == "light") ? "boldFirstWordDark" : (storedTheme == "dark") ? "boldFirstWord" : ""}>
                        Phone :</span> +972 5489302343
                    </m.p>

                    <br />

                    <div className='UserSendEmail'>
                        <Button style={(storedTheme == "light") ? { background: "green" } : (storedTheme == "dark") ? { background: "contained" } : ""}
                            variant="contained"
                            onClick={popUpSendMessage}
                            startIcon={<EmailIcon />}>
                            Click Send Message
                        </Button>
                    </div>

                    <>
                        <Modal show={showSendMessage} onHide={closePopUpModelSendMessage} >
                            <SendEmail hideModelSendMessage={closePopUpModelSendMessage} />
                        </Modal>
                    </>

                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6743.47603500594!2d34.9265383734192!3d32.31889140639387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d15e9603fb971%3A0x6ec59fbe65208f34!2sThe%20Village%20Mall!5e0!3m2!1sen!2sil!4v1659106270835!5m2!1sen!2sil"
                        width="100%" height="280" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                    </iframe>

                </div>



                <div className={(storedTheme == "light") ? "box contectDark" : (storedTheme == "dark") ? "box contect" : ""}>

                    <div className={(storedTheme == "light") ? "logDark" : (storedTheme == "dark") ? "log" : ""}>
                        <h3>Hours Work Clinic :</h3>

                        {date1.hours_work.map((record) => (

                            <m.div variants={item} key={record.id}>
                                <p>{record.day} : {record.time}</p>
                            </m.div>
                        ))}
                        <br />
                        <br />
                        <Card.Img variant="top" src={require("../images/1zx.png")} />
                        <br />
                        <br />
                    </div>

                </div>

            </section>
        </m.div>

    )

}

export default Location;