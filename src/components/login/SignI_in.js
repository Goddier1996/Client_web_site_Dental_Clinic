import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Modal, Form } from 'react-bootstrap';
import '../../css/login.css'
import ForgetPassword from './forgetPassword'
import videoBg from '../../images/video11.mp4'
import { connectUserLogin, connectDemoUserShow, connectDemoDoctorShow } from '../../Api/ConnectOrAddFromApi'
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';



//here component Sign in use in component Menu
function Sign_in(props) {


    // show pop up
    const [showForgetPassword, setShowForgetPassword] = useState(false);
    const handleShowForgetPassword = () => setShowForgetPassword(true);


    const [Login, setLogin] = useState('')
    const [Password, setPassword] = useState('')

    let storedTheme = localStorage.getItem("theme");



    const openSwalWhenLoginShowTypeUser = async (nameUser, UserType_code) => {

        await Swal.fire({
            title: `Hello ${nameUser}`,
            icon: 'success',
            html: `${(UserType_code == 1) ? 'You can now use a variety of actions on our site.' :
                (UserType_code == 2) ? 'Let`s work :)' :
                    (UserType_code == 3) ? 'Let`s Control This Web Side' : ""}`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            background: `${(storedTheme === "light") ? "#373E44" :
                (storedTheme === "dark") ? "" : ""}`,
            color: `${(storedTheme === "light") ? "#ffffffab" :
                (storedTheme === "dark") ? "" : ""}`,
            buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                (storedTheme === "dark") ? "" : ""}`
        })
        window.location.reload(false);
    }



    const CheckValue = () => {

        if (Login == '' || Password == '') {

            Swal.fire({
                icon: 'warning',
                text: 'input please value !',
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
            loginUser()
        }
    }



    const loginUser = async () => {

        let user =
        {
            User_Login: Login,
            User_password: Password
        }

        await connectUserLogin(user);

        let userData = JSON.parse(sessionStorage.getItem("user"));

        if (userData != null) {

            openSwalWhenLoginShowTypeUser(userData.FirstName, userData.UserType_code);
        }

        else {
            Swal.fire({
                icon: 'warning',
                text: 'Sorry dont have This user in Data Base , Try Again',
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
            sessionStorage.clear();
        }
    }



    const showPopForgetPaswword = () => {

        handleShowForgetPassword();
    }



    const connectDemoUser = async () => {

        await connectDemoUserShow();

        let userData = JSON.parse(sessionStorage.getItem("user"));
        openSwalWhenLoginShowTypeUser(userData.FirstName, userData.UserType_code);
    }



    const connectDemoDoctor = async () => {

        await connectDemoDoctorShow();

        let userData = JSON.parse(sessionStorage.getItem("user"));
        openSwalWhenLoginShowTypeUser(userData.FirstName, userData.UserType_code);
    }



    const AdminInfoVideo = () => {

        Swal.fire({
            html: `<div class="styleVideoAdmin"><video controls autoplay loop muted playsinline src=${videoBg}></video></div>`,
            confirmButtonText: 'Wow',
            confirmButtonColor: 'green',
            background: `${(storedTheme === "light") ? "#373e44c8" :
                (storedTheme === "dark") ? "#ffffff8c" : ""}`
        })
    }




    return (

        <>
            <div className="modelLogin">

                <div className={(storedTheme === "light") ? "form-boxDark" : (storedTheme === "dark") ? "form-box" : ""}>
                    <div className="header-form">

                        <Button style={(storedTheme === "light") ? { background: "#424242" } :
                            (storedTheme === "dark") ? { background: "white" } : ""}
                            variant="contained"
                            onClick={props.hideSignIn} >
                            <CloseIcon style={(storedTheme === "light") ? { fontSize: "20px", color: "white" } :
                                (storedTheme === "dark") ? { fontSize: "20px", color: "black" } : ""} />
                        </Button>


                        <h4 className="text-primary text-center">
                            <img className="d-block w-100" src="https://i.postimg.cc/NGVgVYXH/qqq.gif" />
                        </h4>
                        <div className="image"></div>
                    </div>
                    <div className="body-form">

                        <form>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-user"></i></span>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Login"
                                    value={Login}
                                    onChange={(event) => setLogin(event.target.value)} />
                            </div>


                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-lock"></i></span>
                                </div>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={Password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>

                            <div className='loginInOrCloseButtom'>
                                <Button variant="contained" onClick={CheckValue} startIcon={<LoginIcon />}>
                                    Login
                                </Button>

                            </div>

                            <div className={(storedTheme == "light") ? "messageDark" : (storedTheme == "dark") ? "message" : ""}>
                                <p onClick={showPopForgetPaswword}>Forgot your password</p>
                            </div>

                            <div className={(storedTheme == "light") ? "borderSpaceDark" : (storedTheme == "dark") ? "borderSpace" : ""}></div>

                            <div className={(storedTheme == "light") ? "DemoUserAndDoctorDark" : (storedTheme == "dark") ? "DemoUserAndDoctor" : ""}>
                                <p>Connect Demo
                                    <a onClick={connectDemoUser}> User</a> or
                                    <a onClick={connectDemoDoctor}> Doctor</a>
                                </p>
                            </div>


                            <div className={(storedTheme == "light") ? "infoVideoAAdminDark" : (storedTheme == "dark") ? "infoVideoAAdmin" : ""}>
                                <a onClick={AdminInfoVideo}>Click See What Admin can to do !</a>
                            </div>


                            {/* show pop up forget password */}
                            <Modal show={showForgetPassword} style={{ background: "rgba(0, 0, 0, 0.80)" }}>
                                <Modal.Header className='titleHeater'>
                                    <Modal.Title><h1>You forget a Password ? Let's create new :)</h1></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <Form>
                                        <ForgetPassword />
                                    </Form>

                                </Modal.Body>
                            </Modal>

                        </form>
                    </div>
                </div>
            </div>
        </>

    )

}


export default Sign_in;