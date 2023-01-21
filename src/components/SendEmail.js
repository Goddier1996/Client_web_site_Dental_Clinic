import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Swal from "sweetalert2";
import { send } from "emailjs-com";



function SendEmail(props) {

    let storedTheme = localStorage.getItem("theme");


    const [toSend, setToSend] = useState({
        reply_to: '',
        message: '',
    });



    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };



    //send meesage to admin Gmail use EmailJS ,and check value
    const sendMessage = (e) => {

        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


        if (toSend.reply_to == '' || toSend.message == '' || mailformat.test(toSend.reply_to) == false) {

            e.preventDefault();

            Swal.fire({
                position: 'top',
                confirmButtonColor: 'green',
                icon: 'error',
                title: 'you can`t send message<br/>1) please input all value<br/>2) check if your Email was Good !  ',
                toast: true,
                position: 'top-end',
                confirmButtonColor: "green",
                background: `${(storedTheme === "light") ? "#373E44" :
                    (storedTheme === "dark") ? "" : ""}`,
                color: `${(storedTheme === "light") ? "#ffffffab" :
                    (storedTheme === "dark") ? "" : ""}`,
                buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                    (storedTheme === "dark") ? "" : ""}`
            })
        }


        else {
            e.preventDefault();
            send(
                process.env.REACT_APP_SERVICE_KEY,
                process.env.REACT_APP_TEMPLATE,
                toSend,
                process.env.REACT_APP_PASSWORD
            )
                .then((response) => {

                    Swal.fire({
                        title: 'has been sent successfully',
                        text: 'Wait for the webmaster`s response',
                        icon: 'success',
                        confirmButtonColor: "green",
                        background: `${(storedTheme === "light") ? "#373E44" :
                            (storedTheme === "dark") ? "" : ""}`,
                        color: `${(storedTheme === "light") ? "#ffffffab" :
                            (storedTheme === "dark") ? "" : ""}`,
                        buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                            (storedTheme === "dark") ? "" : ""}`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload(false);
                        }
                    })
                })
                .catch((err) => {
                    console.log('FAILED...', err);
                });
        }
    };



    return (

        <div className={(storedTheme === "light") ? "cardModelSendEmailDark" : (storedTheme === "dark") ? "cardModelSendEmail" : ""}>

            <div className="closeModelSendMessage">
                <Button style={(storedTheme === "light") ? { background: "#424242" } :
                    (storedTheme === "dark") ? { background: "white" } : ""}
                    variant="contained"
                    onClick={props.hideModelSendMessage} >

                    <CloseIcon style={(storedTheme === "light") ? { fontSize: "20px", color: "white" } :
                        (storedTheme === "dark") ? { fontSize: "20px", color: "black" } : ""} />
                </Button>
            </div>

            <div className='titleSendEmail'>
                <h1 style={(storedTheme === "light") ? { color: "#ffffffab" } :
                    (storedTheme === "dark") ? { color: "gray" } : ""}>
                    Send Message <img style={{ height: "30px" }} src="https://img.icons8.com/doodle/48/000000/gmail-new.png" />
                </h1>
            </div>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                    type="email"
                    name='reply_to'
                    placeholder='Your Email'
                    value={toSend.reply_to}
                    onChange={handleChange}
                    autoFocus
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                    as="textarea" rows={3}
                    name='message'
                    placeholder='Your Message'
                    value={toSend.message}
                    onChange={handleChange}
                />
            </Form.Group>

            <div className='buttonSendMessage'>
                <Button onClick={sendMessage}
                    variant="contained"
                    style={(storedTheme === "light") ? { fontSize: "13px" } :
                        (storedTheme === "dark") ? { background: "green", fontSize: "13px" } : ""}
                    startIcon={<SendIcon />}>
                    Send Message
                </Button>
            </div>

        </div>
    )

}

export default SendEmail