import React, { useState } from 'react'
import { Form, Col, Row } from 'react-bootstrap';
import '../css/register.css'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';
import { AddNewUserRegester } from '../Api/ConnectOrAddFromApi'
import Button from '@mui/material/Button';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { motion as m } from "framer-motion/dist/framer-motion"
import ReCAPTCHA from "react-google-recaptcha";



// here Register Page
function Register() {

    const history = useHistory()

    // input date Birthday , and show default date when input your date
    let d = new Date();
    let DatePublished = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    const [Birthday, setBirthday] = useState(DatePublished);

    // input value when register
    const [User_Login, setLogin] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    let storedTheme = localStorage.getItem("theme");

    // check box if user not robot
    const [capVal, setCapVal] = useState(null);



    const checkInputValueRegister = async () => {

        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (Password != ConfirmPassword ||
            Password.length < 6 && ConfirmPassword.length <= 6 ||
            User_Login == '' ||
            FirstName == '' ||
            Email == '' ||
            Password == '' ||
            ConfirmPassword == '' ||
            mailFormat.test(Email) == false) {

            Swal.fire({
                icon: 'error',
                title: 'Please Check',
                toast: true,
                confirmButtonColor: "green",
                html: `(1) input all value(Incorrect input) ! <br/>
                 (2) Password NOT Equals ! <br/>
                 (3) Password with 6 or more digits or letters ! <br/>
                 (4) Check if your Email was Good`,
                position: 'top-end',
                background: `${(storedTheme === "light") ? "#373E44" :
                    (storedTheme === "dark") ? "" : ""}`,
                color: `${(storedTheme === "light") ? "#ffffffab" :
                    (storedTheme === "dark") ? "" : ""}`,
                buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                    (storedTheme === "dark") ? "" : ""}`
            })
            return;
        }


        else {

            await registerUser();

            await Swal.fire({
                position: "center",
                background: "none",
                showConfirmButton: false,
                timer: 4000,
                allowOutsideClick: false,
                html: '<div class="ShowImageWhenRegister"><img src="https://i.postimg.cc/MZP7Xzk6/cute-penguin.gif"> </div>',
            });

            history.push("/")
        }

    }



    const registerUser = async () => {

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

        await AddNewUserRegester(user);
    }



    return (

        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
        >
            <section className="banner1">

                <div className={(storedTheme == "light") ? "box1 contect1Dark" : (storedTheme == "dark") ? "box1 contect1" : ""}>

                    <div className={(storedTheme == "light") ? "log1Dark" : (storedTheme == "dark") ? "log1" : ""}>

                        <Form
                            style={(storedTheme === "light") ? { textAlign: "center", alignItems: "center", color: "white" } :
                                (storedTheme === "dark") ? { textAlign: "center", alignItems: "center", color: "#4b4b4b" } : ""}>

                            <Row>
                                <Form.Group as={Col} md="6">
                                    <Form.Control
                                        style={(storedTheme === "light") ? { fontSize: "14px", textAlign: "center" } :
                                            (storedTheme === "dark") ? { background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" } : ""}
                                        placeholder='Enter Login'
                                        value={User_Login}
                                        onChange={(event) => setLogin(event.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="6">
                                    <Form.Control
                                        style={(storedTheme === "light") ? { fontSize: "14px", textAlign: "center" } :
                                            (storedTheme === "dark") ? { background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" } : ""} type="text"
                                        placeholder='Enter First Name'
                                        value={FirstName}
                                        onChange={(event) => setFirstName(event.target.value)}
                                    />
                                </Form.Group>
                            </Row>


                            <Row>
                                <Form.Group as={Col} md="12">
                                    <Form.Control
                                        style={(storedTheme === "light") ? { fontSize: "14px", textAlign: "center" } :
                                            (storedTheme === "dark") ? { background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" } : ""} type="email"
                                        placeholder='Enter Email'
                                        value={Email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col} md="6">
                                    <Form.Control
                                        style={(storedTheme === "light") ? { fontSize: "14px", textAlign: "center" } :
                                            (storedTheme === "dark") ? { background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" } : ""} type="password"
                                        placeholder='Enter Password'
                                        value={Password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="6">
                                    <Form.Control
                                        style={(storedTheme === "light") ? { fontSize: "14px", textAlign: "center" } :
                                            (storedTheme === "dark") ? { background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" } : ""} type="password"
                                        placeholder='Enter Confirm Password'
                                        value={ConfirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                    />
                                </Form.Group>
                            </Row>


                            <Row>
                                <Form.Group as={Col} md="12">

                                    <div className='titleBirthdayDate'>
                                        <p>Enter Birthday Date :</p>
                                    </div>

                                    <Form.Control
                                        style={(storedTheme === "light") ? { fontSize: "14px", textAlign: "center" } :
                                            (storedTheme === "dark") ? { background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" } : ""} type="date"
                                        value={Birthday}
                                        onChange={(event) => setBirthday(event.target.value)}
                                    />
                                </Form.Group>
                            </Row>


                            {/* check box if user dont robot */}
                            <div className="checkBox">
                                <ReCAPTCHA
                                    sitekey={process.env.REACT_APP_RECAPTCHA || ""}
                                    onChange={(val) => setCapVal(val)}
                                />
                            </div>


                            <div style={!capVal ? { cursor: "not-allowed" } : {}}>
                                <Button style={{ fontSize: "13px", color: "white" }}
                                    variant="contained"
                                    disabled={!capVal}
                                    onClick={checkInputValueRegister}
                                    startIcon={<HowToRegIcon />}>
                                    Register
                                </Button>
                            </div>

                        </Form>
                    </div>
                </div>

                <div className="box1 image1"></div>
            </section>
        </m.div>
    )

}


export default Register;