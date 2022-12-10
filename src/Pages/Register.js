import React from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap';
import '../css/register.css'
import { useState } from "react";
import Swal from 'sweetalert2'
import { API } from '../API';
import { useHistory } from 'react-router-dom';




function Register() {

    const history = useHistory()

    const [User_Login, setLogin] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [Email, setEmail] = useState('');
    const [Birthday, setBirthday] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    let storedTheme = localStorage.getItem("theme");



    //check all input if all good Add to new doctor(AddDoctor)

    const [validated, setValidated] = useState(false);


    const handleSubmit = (event) => {

        const form = event.currentTarget;

        if (form.checkValidity() === false || Password != ConfirmPassword || Password.length < 6 && ConfirmPassword.length <= 6) {

            event.preventDefault();
            event.stopPropagation();

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: '(1) you need input all value(Incorrect input) ! <br/> (2) Or Password NOT Equals ! <br/>(3) Or enter a password with 6 or more digits or letters !',
                position: 'top-end'
            })
        }

        else {
            setValidated(true)
            registerUser();
            history.push(`/`);
        }



    };



    //register a new user , save in data base use node js to mySql

    const registerUser = async () => {

        try {
            let user = {
                FirstName,
                User_Login,
                Birthday,
                Email,
                User_password: Password,
                UserType_code: "1",
                ConfirmPassword,
                Day_date: null,
                Hour_day: null,
                Serial_codeHour: null,
                IsActive: "1"
            };

            await fetch(API.USERS.ADD, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });


        } catch (error) {
            console.log(error);
        }
    }




    if (storedTheme === "light") {

        return (
            <div>
                <section className="banner1">

                    <div className="box1 contect1Dark">

                        <div className="log1Dark">

                            <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ textAlign: "center", alignItems: "center", color: "white" }}>
                                <Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Control
                                            style={{ fontSize: "14px", textAlign: "center" }}
                                            type="text"
                                            placeholder='Enter Login'
                                            value={User_Login}
                                            onChange={(event) => setLogin(event.target.value)}
                                            required />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6">
                                        <Form.Control
                                            style={{ fontSize: "14px", textAlign: "center" }}
                                            type="text"
                                            placeholder='Enter First Name'
                                            value={FirstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                            required />
                                    </Form.Group>
                                </Row>


                                <Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Control
                                            style={{ fontSize: "14px", textAlign: "center" }}
                                            type="email"
                                            placeholder='Enter Email'
                                            value={Email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Control
                                            style={{ fontSize: "14px", textAlign: "center" }}
                                            type="password"
                                            placeholder='Enter Password'
                                            value={Password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6">
                                        <Form.Control
                                            style={{ fontSize: "14px", textAlign: "center" }}
                                            type="password"
                                            placeholder='Enter Confirm Password'
                                            value={ConfirmPassword}
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                            required />
                                    </Form.Group>
                                </Row>


                                <Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Control
                                            style={{ fontSize: "14px", textAlign: "center", color: "white" }}
                                            type="date"
                                            value={Birthday}
                                            onChange={(event) => setBirthday(event.target.value)}
                                            required />
                                    </Form.Group>
                                </Row>


                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>

                    <div className="box1 image1"></div>
                </section>
            </div>
        );
    }



    else {

        return (
            <div>
                <section className="banner1">

                    <div className="box1 contect1">
                        <div className="log1">


                            <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ textAlign: "center", alignItems: "center", color: "#4b4b4b" }}>
                                <Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Control
                                            style={{ background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" }}
                                            type="text"
                                            placeholder='Enter Login'
                                            value={User_Login}
                                            onChange={(event) => setLogin(event.target.value)}
                                            required />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6">
                                        <Form.Control
                                            style={{ background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" }}
                                            type="text"
                                            placeholder='Enter First Name'
                                            value={FirstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                            required />
                                    </Form.Group>
                                </Row>


                                <Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Control
                                            style={{ background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" }}
                                            type="email"
                                            placeholder='Enter Email'
                                            value={Email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Control
                                            style={{ background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" }}
                                            type="password"
                                            placeholder='Enter Password'
                                            value={Password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6">
                                        <Form.Control
                                            style={{ background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" }}
                                            type="password"
                                            placeholder='Enter Confirm Password'
                                            value={ConfirmPassword}
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                            required />
                                    </Form.Group>
                                </Row>


                                <Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Control
                                            style={{ background: "rgba(0, 0, 0, 0.1)" }}
                                            type="date"
                                            value={Birthday}
                                            onChange={(event) => setBirthday(event.target.value)}
                                            required />
                                    </Form.Group>
                                </Row>


                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>

                        </div>
                    </div>

                    <div className="box1 image1"></div>
                </section>
            </div>
        );
    }
}


export default Register;