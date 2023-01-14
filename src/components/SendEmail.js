import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Swal from "sweetalert2";
import { send } from "emailjs-com";
import dotenv from 'dotenv'



function SendEmail(props) {

    let storedTheme = localStorage.getItem("theme");


    //value input to message
    const [toSend, setToSend] = useState({
        reply_to: '',
        message: '',
    });


    // const { SERVICE, TEMPLATE, PASSWORD } = process.env;

    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };



    //send meesage to admin Gmail use EmailJS ,and check value
    const onSubmit = (e) => {

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
                confirmButtonColor: "green"
            })
        }


        else {
alert(process.env.REACT_APP_SERVICE_KEY)
            e.preventDefault();
            send(
                process.env.REACT_APP_SERVICE_KEY,
                process.env.REACT_APP_TEMPLATE,
                toSend,
                process.env.REACT_APP_PASSWORD
            )
                .then((response) => {

                    if (storedTheme === "dark") {

                        Swal.fire({
                            title: 'has been sent successfully',
                            text: 'Wait for the webmaster`s response',
                            icon: 'success',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload(false);
                            }
                        })
                    }


                    if (storedTheme === "light") {

                        Swal.fire({
                            title: 'has been sent successfully',
                            text: 'Wait for the webmaster`s response',
                            icon: 'success',
                            background: '#373E44',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload(false);
                            }
                        })
                    }
                })

                .catch((err) => {
                    console.log('FAILED...', err);
                });
        }
    };




    if (storedTheme === "dark") {

        return (

            <div className="cardModelSendEmail">

                <div className="closeModelSendMessage">
                    <Button style={{ background: "white" }} variant="contained" onClick={props.hideModelSendMessage} >
                        <CloseIcon style={{ fontSize: "20px", color: "black" }} />
                    </Button>
                </div>

                <div className='titleSendEmail'>
                    <h1 style={{ color: "gray" }}>Send Message <img style={{ height: "30px" }} src="https://img.icons8.com/doodle/48/000000/gmail-new.png" /></h1>
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
                    <Button onClick={onSubmit} variant="contained"
                        style={{ background: "green", fontSize: "13px" }}
                        startIcon={<SendIcon />}>
                        Send Message
                    </Button>
                </div>

            </div>
        )
    }


    if (storedTheme === "light") {

        return (

            <div className="cardModelSendEmailDark">

                <div className="closeModelSendMessage">
                    <Button style={{ background: "#424242" }} variant="contained" onClick={props.hideModelSendMessage} >
                        <CloseIcon style={{ fontSize: "20px", color: "white" }} />
                    </Button>
                </div>

                <div className='titleSendEmail'>
                    <h1 style={{ color: "#ffffffab" }}>Send Message <img style={{ height: "30px" }} src="https://img.icons8.com/doodle/48/000000/gmail-new.png" /></h1>
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
                    <Button onClick={onSubmit} variant="contained"
                        style={{ fontSize: "13px" }}
                        startIcon={<SendIcon />}>
                        Send Message
                    </Button>
                </div>

            </div>
        )
    }

}

export default SendEmail