import React, { useState, useEffect } from 'react'
import { Form, Col, Row } from 'react-bootstrap';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import Button from '@mui/material/Button';
import { UpdateDataUser } from '../../../../Api/DeleteUpdateDataFromApi'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';
import { alertPopUpIfUserHaveTodayTurn } from '../../../addAppointment/AlertUserHaveTurnToday'



const PersonalData = ({ data_user }) => {


    let storedTheme = localStorage.getItem("theme");
    let history = useHistory();


    const [Login, setLogin] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [Email, setEmail] = useState('');
    const [Birthday, setBirthday] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');


    const CheckValueAndUpdateDataUser = async () => {

        // check value
        if (Password != ConfirmPassword || Password.length < 6 &&
            ConfirmPassword.length <= 6 || Password == '' || ConfirmPassword == '' ||
            Login == '' || FirstName == '' || Email == '' || Birthday == '') {

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
            return;
        }


        // demo user cant update data
        if (data_user.login == "User") {

            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                html: 'Demo User Can t Update data !',
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
            return;
        }


        // update data
        else {

            let user = {
                FirstName: FirstName,
                User_Login: Login,
                Birthday: Birthday,
                Email: Email,
                User_password: Password,
                UserType_code: "1",
                ConfirmPassword: ConfirmPassword,
                Day_date: data_user.day,
                Hour_day: data_user.hour,
                Serial_codeHour: data_user.codeHour
            }

            await UpdateDataUser(data_user.code, user);

            await Swal.fire({
                position: "center",
                background: "none",
                showConfirmButton: false,
                timer: 1000,
                allowOutsideClick: false,
                html: '<div class="ShowImageWhenRegister"><img src="https://i.postimg.cc/X7RTsp8v/pantsbear-goodjob.gif"> </div>',
            });

            await sessionStorage.clear();
            history.push("/");
            window.location.reload(false);
        }
    }


    const alertTodayTurnUser = async () => {

        await alertPopUpIfUserHaveTodayTurn(data_user.day, storedTheme, data_user.hour, data_user.codeHour, data_user.code);
    }


    useEffect(() => {

        alertTodayTurnUser();

        //show use date- when i update user date i show all value in input and choise what i need update
        setFirstName(data_user.name);
        setLogin(data_user.login);
        setEmail(data_user.email);
        setBirthday(data_user.birthday);
        setPassword(data_user.password);
        setConfirmPassword(data_user.confirm_password);
    }, [])


    return (
        <>
            <Form>
                <Row>
                    <Form.Group as={Col} md="4" className='personalDataPlaceFree'>

                        <Form.Label className={(storedTheme === "light") ? "colorTextDark" : (storedTheme === "colorText") ? "" : ""}>
                            Login
                        </Form.Label>

                        <Form.Control
                            value={Login}
                            type="text"
                            onChange={(event) => setLogin(event.target.value)}
                            style={{ backgroundColor: "white", fontWeight: "600", color: "#00000071" }} />

                    </Form.Group>


                    <Form.Group as={Col} md="4" className='personalDataPlaceFree'>

                        <Form.Label className={(storedTheme === "light") ? "colorTextDark" : (storedTheme === "colorText") ? "" : ""}>
                            First Name
                        </Form.Label>

                        <Form.Control
                            placeholder="Enter email"
                            type="text"
                            value={FirstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            style={{ backgroundColor: "white", fontWeight: "600", color: "#00000071" }} />

                    </Form.Group>


                    <Form.Group as={Col} md="4" className='personalDataPlaceFree'>

                        <Form.Label className={(storedTheme === "light") ? "colorTextDark" : (storedTheme === "colorText") ? "" : ""}>
                            Email
                        </Form.Label>

                        <Form.Control
                            placeholder="Enter email"
                            type="text"
                            value={Email}
                            onChange={(event) => setEmail(event.target.value)}
                            style={{ backgroundColor: "white", fontWeight: "600", color: "#00000071" }} />

                    </Form.Group>


                    <Form.Group as={Col} md="4" className='personalDataPlaceFree'>

                        <Form.Label className={(storedTheme === "light") ? "colorTextDark" : (storedTheme === "colorText") ? "" : ""}>
                            Date
                        </Form.Label>

                        <Form.Control
                            placeholder="Enter email"
                            type="Date"
                            value={Birthday}
                            onChange={(event) => setBirthday(event.target.value)}
                            style={{ backgroundColor: "white", fontWeight: "600", color: "#00000071" }} />

                    </Form.Group>


                    <Form.Group as={Col} md="4" className='personalDataPlaceFree'>

                        <Form.Label className={(storedTheme === "light") ? "colorTextDark" : (storedTheme === "colorText") ? "" : ""}>
                            Password
                        </Form.Label>

                        <Form.Control
                            placeholder="Enter email"
                            type="Password"
                            value={Password}
                            onChange={(event) => setPassword(event.target.value)}
                            style={{ backgroundColor: "white", fontWeight: "600", color: "#00000071" }} />

                    </Form.Group>


                    <Form.Group as={Col} md="4" className='personalDataPlaceFree'>

                        <Form.Label className={(storedTheme === "light") ? "colorTextDark" : (storedTheme === "colorText") ? "" : ""}>
                            Confirm Password
                        </Form.Label>

                        <Form.Control
                            placeholder="Confirm Password"
                            type="Password"
                            value={ConfirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            style={{ backgroundColor: "white", fontWeight: "600", color: "#00000071" }} />

                    </Form.Group>
                </Row>

                <div className='enterUpdate'>
                    <Button style={{ fontSize: "13px", background: "green", color: "white" }} variant="contained"
                        onClick={CheckValueAndUpdateDataUser}
                        startIcon={<UpgradeIcon />}>
                        Update
                    </Button>
                </div>
            </Form>
        </>
    )
}


export default PersonalData;