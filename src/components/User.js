import React from 'react'
import { API } from '../API';
import { useState, useEffect } from "react";
import { Tabs, Tab, Button, Modal, Form, Col, Row, Table } from 'react-bootstrap';
import '../css/profile.css'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import PayService from '../components/PayService'




//data_user - take all data user from Page Profile (user)

function User({ data_user }) {



    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);


    let history = useHistory();


    let CountReview = 1;
    let HistoryPayFile = 1;
    let MyReviews = 1;



    let storedTheme = localStorage.getItem("theme");
    let userData = JSON.parse(sessionStorage.getItem("user"));



    const [users, SetUser] = useState([]);

    const [MyReview, SetMyReview] = useState([]);

    const [medical_File, SetMedical_File] = useState([]);

    const [medical_File_Is_Not_Active, SetMedical_File_Is_Not_Active] = useState([]);



    //check in forum input(update user value) if all value input = if yes update , else show erorr

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
                position: 'top-end'
            })
        }

        else {
            setValidated(true)

            updateDateUser();

            sessionStorage.clear();
            history.push("/");
            window.location.reload(false);
        }
    };




    //load data user from data base and save in set

    const LoadUser = async () => {

        let res = await fetch(`${API.USERS.GET}/${data_user.code}`, { method: 'GET' });

        let data = await res.json();
        SetUser(data);
    }




    //active the hour in profile page if user dont need this turn , now status was delete after this function was active

    const ActiveHour = async () => {//1




        if (storedTheme === "dark") {

            Swal.fire({
                title: 'Are you sure you want to cancel the queue?',
                icon: 'question',
                showDenyButton: true,
                confirmButtonText: 'yes',
                denyButtonText: `no`,
                toast: true,
                position: 'top-end'
            }).then((result) => {

                if (result.isConfirmed) {

                    fetch(`${API.HOURS.GET}/active/${userData.Serial_codeHour}`,
                        { method: 'PATCH' }
                    );

                    saveDateUser();
                }

                else if (result.isDenied) {
                    window.location.reload(false);
                }
            })
        }


        if (storedTheme === "light") {

            Swal.fire({
                title: 'Are you sure you want to cancel the queue?',
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

                    saveDateUser();
                }

                else if (result.isDenied) {
                    window.location.reload(false);
                }
            })
        }

    }




    //update user date after active hour to NULL day hour and serial code hour

    const saveDateUser = async () => { // 2

        try {

            let user = {
                FirstName: data_user.name,
                User_Login: data_user.login,
                Birthday: data_user.birthday,
                Email: data_user.email,
                User_password: data_user.password,
                UserType_code: "1",
                Confirm_password: data_user.confirm_password,
                Day_date: null,
                Hour_day: null,
                Serial_codeHour: null
            }

            await fetch(`${API.USERS.GET}/${data_user.code}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });


            // clear session storage after delete a hour day and serial code hour
            sessionStorage.clear();
            history.push("/");
            window.location.reload(false);


        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })

            console.log(error)
        }
    }




    //update user date 

    const updateDateUser = async () => {

        try {

            let user = {
                FirstName: FirstName,
                User_Login: Login,
                Birthday: Birthday,
                Email: Email,
                User_password: Password,
                Confirm_password: ConfirmPassword,
                Day_date: data_user.day,
                Hour_day: data_user.hour,
                Serial_codeHour: data_user.code_hour
            }

            await fetch(`${API.USERS.GET}/${data_user.code}`, {
                // method: 'PUT',
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });


        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })

            console.log(error)
        }
    }




    //show all reviews this user from data base 

    const showAllMyReview = async () => {

        let res = await fetch(`${API.REVIEWS.GET}/${data_user.code}`, { method: 'GET' });

        let data = await res.json();
        SetMyReview(data);
    }




    // delete review this user from data base

    const DeleteReview = async (Id) => {

        if (storedTheme === "dark") {
            // alert(Id)
            Swal.fire({
                title: 'Are you sure you want to delete this Review?',
                icon: 'question',
                showDenyButton: true,
                confirmButtonText: 'yes',
                denyButtonText: `no`,
                toast: true,
                position: 'top-end'
            }).then((result) => {

                if (result.isConfirmed) {

                    fetch(`${API.REVIEWS.GET}/delete/${Id}`,
                        { method: 'DELETE' });

                    window.location.reload(false);

                    history.push("/")
                }

                else if (result.isDenied) {
                    window.location.reload(false);
                }
            })
        }

        if (storedTheme === "light") {

            Swal.fire({
                title: 'Are you sure you want to delete this Review?',
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

                    fetch(`${API.REVIEWS.GET}/delete/${Id}`,
                        { method: 'DELETE' });

                    window.location.reload(false);
                }

                else if (result.isDenied) {
                    window.location.reload(false);
                }
            })
        }

    }




    // load user medical files what dotor send (id:user)

    const LoadMedicalFileUser = async () => {

        let res = await fetch(`${API.MEDICAL_FILE.GET}/${data_user.code}`, { method: 'GET' });

        let data = await res.json();
        SetMedical_File(data);
    }




    //load all  medical files not active = to show a history to user in profile

    const LoadMedicalFileUserIsNotActive = async () => {

        let res = await fetch(`${API.MEDICAL_FILE.GET}/showHistoryFiles/${data_user.code}`, { method: 'GET' });

        let data = await res.json();
        SetMedical_File_Is_Not_Active(data);
    }




    //open pop up pay service , save the data to sessionStorage , to use in component PayService

    const OpenPopUpPay = async (Serial_code, priceSevice, FirstName) => {

        handleShow1();

        let PayDetails = { Serial_code: Serial_code, priceSevice: priceSevice, userName: FirstName }

        sessionStorage.setItem("PayDetails", JSON.stringify(PayDetails))

    }




    //show use date- when i update user date i show all value in input and choise what i need update

    const [Login, setLogin] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [Email, setEmail] = useState('');
    const [Birthday, setBirthday] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');



    useEffect(() => {
        LoadUser();
        showAllMyReview();
        LoadMedicalFileUser();
        LoadMedicalFileUserIsNotActive();


        //show use date- when i update user date i show all value in input and choise what i need update
        setFirstName(data_user.name);
        setLogin(data_user.login);
        setEmail(data_user.email);
        setBirthday(data_user.birthday);
        setPassword(data_user.password);
        setConfirmPassword(data_user.confirm_password);
    }, [])




    if (storedTheme === "dark" && data_user.day == null) {
        return (

            <div>

                <div className="bg-white">

                    <Tabs id="controlled-tab-example" className="mb-3 tabsChiose " >

                        <Tab eventKey="My queues" title="My queues" className='Queues'>

                            <Modal.Dialog className='showMyQueues'>

                                <Modal.Body>

                                    <p>You Don't Have Queues ! <br />
                                        Go to the home page, and order by clicking the queue button. <br />
                                        Or <br />
                                        Click <a style={{ textDecoration: "none", fontWeight: "bold" }} href='/'>Home Page</a>
                                    </p>

                                </Modal.Body>

                            </Modal.Dialog>

                        </Tab>



                        <Tab eventKey="medical File" title="Medical File + Pay service" className='Medical'>

                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Date Publish</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Doctor's response</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Price Service</th>
                                    </tr>
                                </thead>

                                {medical_File.map(File =>

                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{CountReview++}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.textDoctor}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.priceSevice}</td>

                                            <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                <Button href={File.File_user} size="sm" variant="secondary">File</Button>
                                            </td>

                                            <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                <Button size="sm" variant="success" onClick={() => OpenPopUpPay(File._id, File.priceSevice, File.name)}>Pay</Button>
                                            </td>


                                            <Modal show={show1} onHide={handleClose1} >
                                                <PayService />
                                                {/* data={{ code: File.Serial_code, price: File.priceSevice }} */}
                                            </Modal>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>



                        <Tab eventKey="History (medical File)" title="History (medical File)" className='HistoryMedical'>

                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Date Publish</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Doctor's response</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Price Service</th>

                                    </tr>
                                </thead>

                                {medical_File_Is_Not_Active.map(File =>

                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{HistoryPayFile++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{File.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.textDoctor}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.priceSevice}</td>

                                            <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                <Button href={File.File_user} size="sm" variant="secondary">File</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>



                        <Tab eventKey="My Comments" title="My Comments (Reviews)" className='Comments'>

                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Date Publish</th>
                                        <th style={{ textAlign: "center" }}>Review</th>
                                        <th style={{ width: "1%" }}></th>
                                    </tr>
                                </thead>

                                {MyReview.map(Review =>

                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{MyReviews++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{Review.DatePublished}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{Review.textReviews}</td>
                                            <td><Button size="sm" variant="danger"
                                                onClick={() => DeleteReview(Review._id)}>
                                                delete</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>



                        <Tab eventKey="personal data" title="personal data (Update)" className='updateDateUser'>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                                <Row>

                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                        <Form.Label className='colorText'>Login</Form.Label>

                                        <Form.Control

                                            value={Login}
                                            type="text"
                                            onChange={(event) => setLogin(event.target.value)}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid login.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" ccontrolId="validationCustom02">
                                        <Form.Label className='colorText'>FirstName</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="text"
                                            value={FirstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid FirstName.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                                        <Form.Label className='colorText'>mail</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="text"
                                            value={Email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid mail.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                                        <Form.Label className='colorText'>Date</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Date"
                                            value={Birthday}
                                            onChange={(event) => setBirthday(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Date.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom05">
                                        <Form.Label className='colorText'>Password</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Password"
                                            value={Password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom06">
                                        <Form.Label className='colorText'>Confirm Password</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Password"
                                            value={ConfirmPassword}
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Confirm Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <div className='enterUpdate'>
                                    <Button type="submit" variant="success">Submit form</Button>
                                </div>
                            </Form>

                        </Tab>

                    </Tabs>

                </div>
            </div>
        );

    }



    else if (storedTheme === "dark" && data_user.day != null) {

        return (
            <div>


                <div className="bg-white">

                    <Tabs id="controlled-tab-example" className="mb-3 tabsChiose " >

                        <Tab eventKey="My queues" title="My queues" className='Queues'>

                            <Modal.Dialog className='showMyQueues'>

                                <Modal.Body>

                                    <p><h6>Your Queues :</h6> <br />
                                        Day : {userData.Day_date}<br />
                                        Hour : {userData.Hour_day}<br /><br />
                                        <h6 style={{ fontSize: "13px", color: "black" }}>if you don`t need this queue Please cancel !</h6>
                                    </p>

                                </Modal.Body>

                                <Modal.Footer className='ButtonQueues'>
                                    <Button variant="danger" onClick={() => ActiveHour()} >delete queues</Button>
                                </Modal.Footer>

                            </Modal.Dialog>

                        </Tab>



                        <Tab eventKey="medical File" title="Medical File + Pay service" className='Medical'>

                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Date Publish</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Doctor's response</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Price Service</th>

                                    </tr>
                                </thead>

                                {medical_File.map(File =>

                                    <tbody>
                                        <tr>
                                            <td>{CountReview++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{File.DatePublished}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.textDoctor}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.priceSevice}</td>

                                            <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                <Button href={File.File_user} size="sm" variant="secondary">File
                                                </Button>
                                            </td>

                                            <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                <Button size="sm" variant="success" onClick={() => OpenPopUpPay(File.Serial_code, File.priceSevice, File.FirstName)}>Pay</Button>
                                            </td>


                                            <Modal show={show1} onHide={handleClose1} >
                                                <PayService />
                                            </Modal>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>



                        <Tab eventKey="History (medical File)" title="History (medical File)" className='HistoryMedical'>

                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Date Publish</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Doctor's response</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Price Service</th>

                                    </tr>
                                </thead>

                                {medical_File_Is_Not_Active.map(File =>

                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{HistoryPayFile++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{File.DatePublished}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.textDoctor}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.priceSevice}</td>

                                            <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                <Button href={File.File_user} size="sm" variant="secondary">File
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>



                        <Tab eventKey="My Comments" title="My Comments (Reviews)" className='Comments'>


                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Date Publish</th>
                                        <th style={{ textAlign: "center" }}>Review</th>
                                        <th style={{ width: "1%" }}></th>
                                    </tr>
                                </thead>

                                {MyReview.map(Review =>

                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{MyReviews++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{Review.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{Review.textReviews}</td>
                                            <td><Button size="sm" variant="danger"
                                                onClick={() => DeleteReview(Review.Serial_code)}>
                                                delete</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>


                        </Tab>



                        <Tab eventKey="personal data" title="personal data (Update)" className='updateDateUser'>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                                <Row>

                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                        <Form.Label className='colorText'>Login</Form.Label>

                                        <Form.Control

                                            value={Login}
                                            type="text"
                                            onChange={(event) => setLogin(event.target.value)}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid login.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" ccontrolId="validationCustom02">
                                        <Form.Label className='colorText'>FirstName</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="text"
                                            value={FirstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid FirstName.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                                        <Form.Label className='colorText'>mail</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="text"
                                            value={Email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid mail.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                                        <Form.Label className='colorText'>Date</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Date"
                                            value={Birthday}
                                            onChange={(event) => setBirthday(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Date.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom05">
                                        <Form.Label className='colorText'>Password</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Password"
                                            value={Password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom06">
                                        <Form.Label className='colorText'>Confirm Password</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Password"
                                            value={ConfirmPassword}
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Confirm Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <div className='enterUpdate'>
                                    <Button type="submit" variant="success">Submit form</Button>
                                </div>

                            </Form>
                        </Tab>

                    </Tabs>

                </div>
            </div>
        )
    }



    else if (storedTheme === "light" && data_user.day == null) {

        return (
            <div>

                <div>

                    <Tabs id="controlled-tab-example" className="mb-3 tabsChioseDark " >

                        <Tab eventKey="My queues" title="My queues" className='QueuesDark' >

                            <Modal.Dialog className='showMyQueuesDark'>

                                <Modal.Body>

                                    <p>You Don't Have Queues ! <br />
                                        Go to the home page, and order by clicking the queue button. <br />
                                        Or <br />
                                        Click <a style={{ textDecoration: "none", fontWeight: "bold" }} href='/'>Home Page</a>
                                    </p>

                                </Modal.Body>

                            </Modal.Dialog>

                        </Tab>



                        <Tab eventKey="medical File" title="Medical File + Pay service" className='Medical'>

                            <Table size="sm" striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Date Publish</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Doctor's response</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Price Service</th>

                                    </tr>
                                </thead>

                                {medical_File.map(File =>

                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{CountReview++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{File.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.textDoctor}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.priceSevice}</td>

                                            <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                <Button href={File.File_user} size="sm" variant="secondary">File
                                                </Button>
                                            </td>

                                            <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                <Button size="sm" variant="success" onClick={() => OpenPopUpPay(File.Serial_code, File.priceSevice, File.FirstName)}>Pay</Button>
                                            </td>


                                            <Modal show={show1} onHide={handleClose1} >
                                                <PayService />
                                            </Modal>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>



                        <Tab eventKey="History (medical File)" title="History (medical File)" className='HistoryMedical'>

                            <Table striped bordered hover variant="dark" size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Date Publish</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Doctor's response</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Price Service</th>

                                    </tr>
                                </thead>

                                {medical_File_Is_Not_Active.map(File =>

                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{HistoryPayFile++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{File.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.textDoctor}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.priceSevice}</td>

                                            <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                <Button href={File.File_user} size="sm" variant="secondary">File
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>



                        <Tab eventKey="My Comments" title="My Comments (Reviews)" className='Comments'>

                            <Table striped bordered hover variant="dark" size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Date Publish</th>
                                        <th style={{ textAlign: "center" }}>Review</th>
                                        <th style={{ width: "1%" }}></th>
                                    </tr>
                                </thead>

                                {MyReview.map(Review =>

                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{MyReviews++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{Review.DatePublished}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{Review.textReviews}</td>
                                            <td><Button size="sm" variant="danger"
                                                onClick={() => DeleteReview(Review.Serial_code)}>
                                                delete</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>



                        <Tab eventKey="personal data" title="personal data (Update)" className='updateDateUser'>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                                <Row>

                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                        <Form.Label className='colorTextDark'>Login</Form.Label>

                                        <Form.Control

                                            value={Login}
                                            type="text"
                                            onChange={(event) => setLogin(event.target.value)}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid login.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" ccontrolId="validationCustom02">
                                        <Form.Label className='colorTextDark' >FirstName</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="text"
                                            value={FirstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid FirstName.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                                        <Form.Label className='colorTextDark'>mail</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="text"
                                            value={Email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid mail.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                                        <Form.Label className='colorTextDark'>Date</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Date"
                                            value={Birthday}
                                            onChange={(event) => setBirthday(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Date.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom05">
                                        <Form.Label className='colorTextDark'>Password</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Password"
                                            value={Password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom06">
                                        <Form.Label className='colorTextDark'>Confirm Password</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Password"
                                            value={ConfirmPassword}
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Confirm Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <div className='enterUpdate'>
                                    <Button type="submit" variant="success">Submit form</Button>
                                </div>

                            </Form>
                        </Tab>

                    </Tabs>

                </div>
            </div>
        )
    }



    else if (storedTheme === "light" && data_user.day != null) {

        return (
            <div>


                <div>


                    <Tabs id="controlled-tab-example" className="mb-3 tabsChioseDark " >

                        <Tab eventKey="My queues" title="My queues" className='QueuesDark' >

                            <Modal.Dialog className='showMyQueuesDark'>

                                <Modal.Body>

                                    <p><h6 style={{ fontWeight: "bold" }}>Your Queues :</h6> <br />
                                        Day : {userData.Day_date}<br />
                                        Hour : {userData.Hour_day}<br /><br />
                                        <h6 style={{ fontSize: "13px", color: "white" }}>if you don`t need this queue Please cancel !</h6>
                                    </p>

                                </Modal.Body>

                                <Modal.Footer className='ButtonQueues' >
                                    <Button variant="danger" onClick={ActiveHour}>delete queues</Button>
                                </Modal.Footer>

                            </Modal.Dialog>



                        </Tab>



                        <Tab eventKey="medical File" title="Medical File + Pay service" className='Medical'>

                            <Table size="sm" striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Date Publish</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Doctor's response</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Price Service</th>

                                    </tr>
                                </thead>

                                {medical_File.map(File =>

                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{CountReview++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{File.DatePublished}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.textDoctor}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.priceSevice}</td>

                                            <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                <Button href={File.File_user} size="sm" variant="secondary">File
                                                </Button>
                                            </td>

                                            <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                <Button size="sm" variant="success" onClick={() => OpenPopUpPay(File.Serial_code, File.priceSevice, File.FirstName)}>Pay</Button>
                                            </td>


                                            <Modal show={show1} onHide={handleClose1} >
                                                <PayService />
                                            </Modal>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>



                        <Tab eventKey="History (medical File)" title="History (medical File)" className='HistoryMedical'>

                            <Table striped bordered hover variant="dark" size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Date Publish</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Doctor's response</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Price Service</th>

                                    </tr>
                                </thead>

                                {medical_File_Is_Not_Active.map(File =>

                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{HistoryPayFile++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{File.DatePublished}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.textDoctor}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.priceSevice}</td>

                                            <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                <Button href={File.File_user} size="sm" variant="secondary">File
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>



                        <Tab eventKey="My Comments" title="My Comments (Reviews)" className='Comments'>

                            <Table striped bordered hover variant="dark" size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Date Publish</th>
                                        <th style={{ textAlign: "center" }}>Review</th>
                                        <th style={{ width: "1%" }}></th>
                                    </tr>
                                </thead>

                                {MyReview.map(Review =>

                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{MyReviews++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{Review.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{Review.textReviews}</td>
                                            <td><Button size="sm" variant="danger"
                                                onClick={() => DeleteReview(Review.Serial_code)}>
                                                delete
                                            </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>



                        <Tab eventKey="personal data" title="personal data (Update)" className='updateDateUser'>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                                <Row>

                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                        <Form.Label className='colorTextDark'>Login</Form.Label>

                                        <Form.Control
                                            value={Login}
                                            type="text"
                                            onChange={(event) => setLogin(event.target.value)}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid login.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" ccontrolId="validationCustom02">
                                        <Form.Label className='colorTextDark'>FirstName</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="text"
                                            value={FirstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid FirstName.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                                        <Form.Label className='colorTextDark'>mail</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="text"
                                            value={Email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid mail.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                                        <Form.Label className='colorTextDark'>Date</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Date"
                                            value={Birthday}
                                            onChange={(event) => setBirthday(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Date.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom05">
                                        <Form.Label className='colorTextDark'>Password</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Password"
                                            value={Password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom06">
                                        <Form.Label className='colorTextDark'>Confirm Password</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Password"
                                            value={ConfirmPassword}
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Confirm Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <div className='enterUpdate'>
                                    <Button type="submit" variant="success">Submit form</Button>
                                </div>

                            </Form>
                        </Tab>

                    </Tabs>

                </div>
            </div>
        )
    }

}


export default User;