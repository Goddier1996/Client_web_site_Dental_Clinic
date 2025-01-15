import React, { useState } from 'react'
import { Button, Row, Form, Col } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { AddNewUserRegester } from '../../../../Api/ConnectOrAddFromApi'


const AddNewDoctor = () => {

    const [Login, setLogin] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [Email, setEmail] = useState('');
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
            setValidated(true);
            AddDoctor();
            Swal.fire({
                title: 'success',
                icon: 'success',
                toast: true,
                position: 'top-end',
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
        }
    };


    const AddDoctor = async () => {

        let user = {
            FirstName: FirstName,
            User_Login: Login,
            Birthday: null,
            Email: Email,
            User_password: Password,
            UserType_code: "2",
            ConfirmPassword: ConfirmPassword,
            Day_date: null,
            Hour_day: null,
            Serial_codeHour: null,
            IsActive: "1"
        };

        await AddNewUserRegester(user);
        window.location.reload(false);
    }


    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ textAlign: "center", alignItems: "center", color: "#4b4b4b" }}>
                <Row>
                    <Form.Group as={Col} >
                        <Form.Label className={(storedTheme === "light") ? "colorTextDark" : (storedTheme === "colorText") ? "" : ""}>Login</Form.Label >
                        <Form.Control
                            style={{ background: "none" }}
                            type="text"
                            value={Login}
                            onChange={(event) => setLogin(event.target.value)}
                            required />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label className={(storedTheme === "light") ? "colorTextDark" : (storedTheme === "colorText") ? "" : ""}>First Name</Form.Label>
                        <Form.Control
                            style={{ background: "none" }}
                            type="text"
                            value={FirstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            required />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} md="6">
                        <Form.Label className={(storedTheme === "light") ? "colorTextDark" : (storedTheme === "colorText") ? "" : ""}>Email</Form.Label>
                        <Form.Control
                            style={{ background: "none" }}
                            type="email"
                            value={Email}
                            onChange={(event) => setEmail(event.target.value)}
                            required />
                    </Form.Group>

                    <Form.Group as={Col} md="3">
                        <Form.Label className={(storedTheme === "light") ? "colorTextDark" : (storedTheme === "colorText") ? "" : ""}>Password</Form.Label>
                        <Form.Control
                            style={{ background: "none" }}
                            type="password"
                            value={Password}
                            onChange={(event) => setPassword(event.target.value)}
                            required />
                    </Form.Group>

                    <Form.Group as={Col} md="3">
                        <Form.Label className={(storedTheme === "light") ? "colorTextDark" : (storedTheme === "colorText") ? "" : ""}>Confirm Password</Form.Label>
                        <Form.Control
                            style={{ background: "none" }}
                            type="password"
                            value={ConfirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            required />
                    </Form.Group>
                </Row>

                <br />

                <Button variant="success" type="submit">
                    Add
                </Button>
            </Form>
        </>
    )
}


export default AddNewDoctor;