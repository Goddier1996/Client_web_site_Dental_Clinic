import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import '../css/loction.css'
import date1 from '../Json_date/date.json'
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import { Modal } from 'react-bootstrap';
import SendEmail from '../components/SendEmail'



//here we show loction the clinic , we use data from json file and show all data in this page

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

        <div>
            <section className="bannerLoction">

                <div className={(storedTheme == "light") ? "boxLoctionDark" : (storedTheme == "dark") ? "boxLoction" : ""}>
                    <h3>Contact :</h3>

                    <Card.Body key={date1.Map.id}>
                        <Card.Text>
                            City : {date1.Map.country} , {date1.Map.City}
                        </Card.Text>
                        <Card.Text>
                            Street : {date1.Map.addressCity} , {date1.Map.adressNum}
                        </Card.Text>
                        <Card.Text>
                            Email : artium@gmail.com
                        </Card.Text>
                        <Card.Text>
                            Phone : +972 5489302343
                        </Card.Text>


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

                    </Card.Body>

                </div>



                <div className={(storedTheme == "light") ? "box contectDark" : (storedTheme == "dark") ? "box contect" : ""}>

                    <div className={(storedTheme == "light") ? "logDark" : (storedTheme == "dark") ? "log" : ""}>
                        <h3>Hours Work Clinic :</h3>
                        <br></br>

                        {date1.hours_work.map((record) => (

                            <div key={record.id}>
                                <p>{record.day} : {record.time}</p>
                            </div>
                        ))}

                        <Card.Img variant="top" src={require("../images/1zx.png")} />
                        <br></br>
                    </div>

                </div>

            </section>
        </div>

    )

}

export default Location;