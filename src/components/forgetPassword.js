import React from 'react'
import { API } from '../Api/API';
import { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import '../css/forgetPassword.css'



//here component forget Paswword use in sign In component
function ForgetPaswword() {

    const history = useHistory()

    const [showNewNewPassword, setShowNewPassword] = useState(false);
    const handleShowNewPassword = () => setShowNewPassword(true);

    const [Email, setEmail] = useState('');

    const [User_password, setUser_password] = useState('');
    const [Confirm_password, setConfirm_password] = useState('');


    //create a this sessioStorgae in ForgetUser
    let userForget = JSON.parse(sessionStorage.getItem("userForgetPassword"));

    let storedTheme = localStorage.getItem("theme");



    //here we search if we have this email in data bse , if have we send the data use from data base to sessionStorage
    const ForgetUser = async () => {

        if (Email < 1) {
            Swal.fire({
                text: 'please input your Email ',
                icon: 'warning',
                toast: true,
                position: 'top-end'
            })
        }

        else {

            try {

                let user =
                {
                    Email: Email
                };

                let res = await fetch(API.USERS.FORGET, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });

                let data = await res.json();


                if (storedTheme === "dark") {

                    Swal.fire({
                        title: `${data.FirstName} We found you. Let's change a new password :)`,
                        icon: 'info',
                        toast: true,
                        position: 'top-end',
                    }).then((result) => {

                        if (result.isConfirmed) {

                            sessionStorage.setItem("userForgetPassword", JSON.stringify(data));
                            handleShowNewPassword() // show pop up change password
                        }
                    })
                }

                if (storedTheme === "light") {

                    Swal.fire({
                        title: `${data.FirstName} We found you. Let's change a new password :)`,
                        icon: 'info',
                        background: '#373E44',
                        color: '#ffffffab',
                        toast: true,
                        position: 'top-end'
                    }).then((result) => {

                        if (result.isConfirmed) {

                            sessionStorage.setItem("userForgetPassword", JSON.stringify(data));

                            handleShowNewPassword() // show pop up change password
                        }
                    })
                }


            } catch (error) {
                console.log(error);
            }
        }
    }



    // check value input a new password
    const checkValueInput = () => {

        if (User_password == '' || Confirm_password == '') {

            if (storedTheme === "dark") {

                Swal.fire({
                    text: 'Please Input your new Password!',
                    icon: 'error',
                    toast: true,
                    position: 'top-end'
                })

                return;
            }

            if (storedTheme === "light") {

                Swal.fire({
                    text: 'Please Input your new Password!',
                    icon: 'error',
                    toast: true,
                    background: '#373E44',
                    position: 'top-end'
                })
                return;
            }

        }


        if (User_password === Confirm_password) {

            ForgetPassword();
        }

        else {

            if (storedTheme === "dark") {

                Swal.fire({
                    text: 'Password NOT Equals!',
                    icon: 'error',
                    toast: true,
                    position: 'top-end'
                })
            }

            if (storedTheme === "light") {

                Swal.fire({
                    text: 'Password NOT Equals!',
                    icon: 'error',
                    background: '#373E44',
                    toast: true,
                    position: 'top-end'
                })
            }
        }

    }



    //here update to new password 
    const ForgetPassword = async () => {


        try {
            let user = {
                User_password: User_password,
                ConfirmPassword: Confirm_password
            }

            await fetch(`${API.USERS.GET}/${userForget._id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            sessionStorage.clear('userForgetPassword');


            if (storedTheme === "dark") {

                Swal.fire({
                    icon: 'success',
                    toast: true,
                    position: 'top-end'
                }).then((result) => {

                    if (result.isConfirmed) {

                        history.push("/");
                        window.location.reload(false);
                    }
                })
            }

            if (storedTheme === "light") {

                Swal.fire({
                    icon: 'success',
                    background: '#373E44',
                    toast: true,
                    position: 'top-end'
                }).then((result) => {

                    if (result.isConfirmed) {

                        history.push("/");
                        window.location.reload(false);
                    }
                })
            }


        } catch (error) {
            console.log(error)
        }

    }




    //if you click not save new password
    const closeForgetPassword = async () => {

        if (storedTheme === "dark") {

            Swal.fire({
                title: 'Are you sure don`t change Password?',
                icon: 'question',
                showDenyButton: true,
                confirmButtonText: 'yes',
                denyButtonText: `no`,
                toast: true,
                position: 'top-end'
            }).then((result) => {

                if (result.isConfirmed) {

                    sessionStorage.clear('userForgetPassword');
                    window.location.reload(false);
                }
            })
        }

        if (storedTheme === "light") {

            Swal.fire({
                title: 'Are you sure don`t change Password?',
                icon: 'question',
                showDenyButton: true,
                confirmButtonText: 'yes',
                denyButtonText: `no`,
                background: '#373E44',
                color: '#ffffffab',
                toast: true,
                position: 'top-end'
            }).then((result) => {

                if (result.isConfirmed) {

                    sessionStorage.clear('userForgetPassword');
                    window.location.reload(false);
                }
            })
        }
    }



    return (

        <>
            <div className='enterEmail'>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="enter your Email"
                        value={Email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoFocus
                    />

                    <div className='startChangePassword'>
                        <Button variant="warning" onClick={ForgetUser}>Ok</Button>
                        <Button variant="danger" onClick={closeForgetPassword}>Close</Button>
                    </div>

                </Form.Group>
            </div>



            <div className='inputChangePasswort'>
                <Modal show={showNewNewPassword} style={{ background: "rgba(0, 0, 0, 0.9)" }}>

                    <Modal.Header>
                        <Modal.Title><h1>Input new Password :</h1></Modal.Title>
                    </Modal.Header>


                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="enter new password"
                            value={User_password}
                            onChange={(event) => setUser_password(event.target.value)}
                            autoFocus
                        />
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="confirm password"
                            value={Confirm_password}
                            onChange={(event) => setConfirm_password(event.target.value)}
                        />
                    </Form.Group>


                    <Modal.Footer>

                        <Button variant="primary" onClick={checkValueInput}>
                            Save Changes
                        </Button>

                        <Button variant="secondary" onClick={closeForgetPassword}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </>


    )
}


export default ForgetPaswword;