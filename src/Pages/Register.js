import React, { useState } from 'react'
import { Form, Col, Row } from 'react-bootstrap';
import '../css/register.css'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';
import { AddNewUserRegester } from '../Api/ConnectOrAddFromApi'
import Button from '@mui/material/Button';
import HowToRegIcon from '@mui/icons-material/HowToReg';



// here Register Page
function Register() {

    const history = useHistory()

    // input date Birthday , and show defult date when input your date
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


    //check all input if all good 
    const [validated, setValidated] = useState(false);


    const handleSubmit = (event) => {

        const form = event.currentTarget;

        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (form.checkValidity() === false ||
            Password != ConfirmPassword ||
            Password.length < 6 && ConfirmPassword.length <= 6 ||
            mailformat.test(Email) == false) {

            event.preventDefault();
            event.stopPropagation();

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                toast: true,
                confirmButtonColor: "green",
                html: `(1) you need input all value(Incorrect input) ! <br/>
                 (2) Or Password NOT Equals ! <br/>
                 (3) Or enter a password with 6 or more digits or letters ! <br/>
                 (4) Check if your Email was Good`,
                position: 'top-end',
                background: `${(storedTheme === "light") ? "#373E44" :
                    (storedTheme === "dark") ? "" : ""}`,
                color: `${(storedTheme === "light") ? "#ffffffab" :
                    (storedTheme === "dark") ? "" : ""}`,
                buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                    (storedTheme === "dark") ? "" : ""}`
            })
        }

        else {
            setValidated(true)
            registerUser();
            history.push(`/`);
        }
    };



    //register a new user , save in data base
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

        <div>
            <section className="banner1">

                <div className={(storedTheme == "light") ? "box1 contect1Dark" : (storedTheme == "dark") ? "box1 contect1" : ""}>

                    <div className={(storedTheme == "light") ? "log1Dark" : (storedTheme == "dark") ? "log1" : ""}>

                        <Form noValidate validated={validated} onSubmit={handleSubmit}
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
                                        required />
                                </Form.Group>

                                <Form.Group as={Col} md="6">
                                    <Form.Control
                                        style={(storedTheme === "light") ? { fontSize: "14px", textAlign: "center" } :
                                            (storedTheme === "dark") ? { background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" } : ""} type="text"
                                        placeholder='Enter First Name'
                                        value={FirstName}
                                        onChange={(event) => setFirstName(event.target.value)}
                                        required />
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
                                        required />
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
                                        required />
                                </Form.Group>

                                <Form.Group as={Col} md="6">
                                    <Form.Control
                                        style={(storedTheme === "light") ? { fontSize: "14px", textAlign: "center" } :
                                            (storedTheme === "dark") ? { background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" } : ""} type="password"
                                        placeholder='Enter Confirm Password'
                                        value={ConfirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                        required />
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
                                        required />
                                </Form.Group>
                            </Row>


                            <Button type="submit" style={{ fontSize: "13px", color: "white" }} variant="contained"
                                startIcon={<HowToRegIcon />}>
                                Register
                            </Button>
                        </Form>
                    </div>
                </div>

                <div className="box1 image1"></div>
            </section>
        </div>
    )

}


export default Register;