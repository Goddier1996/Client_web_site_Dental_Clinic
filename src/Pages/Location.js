import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import '../css/loction.css'
import date1 from '../Json_date/date.json'
import Swal from 'sweetalert2'
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



    useEffect(() => {

        Swal.fire({
            background: 'none',
            showConfirmButton: false,
            timer: 700,
            html: '<div class="loader"></div>'
        })
    }, [])



    if (storedTheme === "light") {

        return (
            <div>
                <section className="bannerLoction">

                    <div className="boxLoctionDark  ">
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
                                <Button style={{ background: "green" }} variant="contained" onClick={popUpSendMessage} startIcon={<EmailIcon />}>
                                    Click Send Message
                                </Button>
                            </div>

                            <>
                                <Modal show={showSendMessage} style={{ background: "rgba(0, 0, 0, 0.70)" }} >
                                    <SendEmail hideModelSendMessage={closePopUpModelSendMessage} />
                                </Modal>
                            </>

                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6743.47603500594!2d34.9265383734192!3d32.31889140639387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d15e9603fb971%3A0x6ec59fbe65208f34!2sThe%20Village%20Mall!5e0!3m2!1sen!2sil!4v1659106270835!5m2!1sen!2sil"
                                width="100%" height="280" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                            </iframe>

                        </Card.Body>

                    </div>

                    <div className="box contectDark">

                        <div className="logDark">
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
        );
    }



    else {

        return (
            <div>

                <section className="bannerLoction">

                    <div className="boxLoction  ">
                        <h3>Contact :</h3>

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
                            <Button variant="contained" onClick={popUpSendMessage} startIcon={<EmailIcon />}>
                                Click Send Message
                            </Button>
                        </div>

                        <>
                            <Modal show={showSendMessage} style={{ background: "rgba(0, 0, 0, 0.70)" }} >
                                <SendEmail hideModelSendMessage={closePopUpModelSendMessage} />
                            </Modal>
                        </>

                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6743.47603500594!2d34.9265383734192!3d32.31889140639387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d15e9603fb971%3A0x6ec59fbe65208f34!2sThe%20Village%20Mall!5e0!3m2!1sen!2sil!4v1659106270835!5m2!1sen!2sil"
                            width="100%" height="280" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                        </iframe>

                    </div>

                    <div className="box contect">

                        <div className="log">
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
        );
    }

}

export default Location;