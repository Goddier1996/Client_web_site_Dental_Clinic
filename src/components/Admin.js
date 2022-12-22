import React from 'react'
import { Tabs, Tab, Button, Row, Form, Col, Table } from 'react-bootstrap';
import { useState, useEffect } from "react";
import '../css/profile.css'
import Swal from 'sweetalert2'
import { API } from '../API';


//here component Admin we to do what admin can do = this component use in profile
function Admin() {

    const [Users, SetUsers] = useState([])
    const [UsersBlocked, SetUsersBlocked] = useState([])
    const [Doctors, SetDoctors] = useState([])
    const [Reviews, SetReviews] = useState([])

    let CountUser = 1;
    let CountUserBlock = 1;
    let CountDoctor = 1;
    let CountReview = 1;

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
                position: 'top-end'
            })
        }

        else {
            setValidated(true)

            AddDoctor()

            Swal.fire({
                title: 'success',
                icon: 'success',
                toast: true,
                position: 'top-end'
            }).then((result) => {

                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })

        }
    };



    //admin can see all users how in data base
    const LoadAllUsers = async () => {

        let res = await fetch(`${API.USERS.GET}`, { method: 'GET' });
        let data = await res.json();

        SetUsers(data);
    }



    //show all blocked all users
    const LoadAllUsersBlocked = async () => {

        let res = await fetch(`${API.USERS.GET}/BlockUsers`, { method: 'GET' });
        let data = await res.json();

        SetUsersBlocked(data);
    }



    //admin can see all Doctors  how in data base
    const LoadAllDoctors = async () => {

        let res = await fetch(`${API.USERS.GET}/showDoctors`, { method: 'GET' });
        let data = await res.json();

        SetDoctors(data);
    }


    //admin can see all Reviews what this in data base
    const LoadAllReviews = async () => {

        let res = await fetch(API.REVIEWS.GET, { method: 'GET' });
        let data = await res.json();

        SetReviews(data);
    }



    //admin can block the user
    const DeleteUser = async (Id) => {
        // alert(Id)
        await fetch(`${API.USERS.GET}/NotActive/${Id}`,
            { method: 'PATCH' }
        );
        window.location.reload(false);
    }



    //active all users how was block
    const ActiveUser = async (Id) => {

        let res = await fetch(`${API.USERS.GET}/active/${Id}`, { method: 'PATCH' });
        window.location.reload(false);
    }



    //admin delete a review
    const DeleteReview = async (Id) => {

        await fetch(`${API.REVIEWS.GET}/delete/${Id}`,
            { method: 'DELETE' }
        );
        window.location.reload(false);
    }



    //add a new doctor to data base
    const AddDoctor = async () => {

        try {
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

            await fetch(API.USERS.ADD, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            window.location.reload(false);

        } catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {

        LoadAllUsers();
        LoadAllDoctors();
        LoadAllReviews();
        LoadAllUsersBlocked();

        Swal.fire({
            background: 'none',
            width: 400,
            showConfirmButton: false,
            timer: 2100,
            html: '<img src="https://i.postimg.cc/KzypDw9n/admin.png" height="200"></img>'
        })
    }, [])




    if (storedTheme === "dark") {

        return (
            <div>

                <Tabs id="controlled-tab-example" className="mb-3 tabsChiose " >

                    <Tab eventKey="show all users" title="All Users" className='AllUsers'>

                        <Table bordered hover size="sm" >

                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Login</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>First Name</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Birthday</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Password</th>
                                </tr>
                            </thead>

                            {Users.map(user =>

                                <tbody key={user._id} >
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountUser++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_Login}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Email}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Birthday}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_password}</td>

                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="danger" onClick={() => DeleteUser(user._id)}>Block</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>



                    <Tab eventKey="show all users blocked" title="All Users Blocked" className='AllUsersBlocked'>

                        <Table bordered hover size="sm">

                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Login</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>First Name</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Birthday</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Password</th>
                                </tr>
                            </thead>

                            {UsersBlocked.map(user =>

                                <tbody key={user._id}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountUserBlock++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_Login}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Email}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Birthday}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_password}</td>


                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="success" onClick={() => ActiveUser(user._id)}>Reactive</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>



                    <Tab eventKey="show all Doctors" title="All Doctors" className='AllDoctors'>

                        <Table bordered hover size="sm">

                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Login</th>
                                    <th style={{ width: "4%", textAlign: "center" }}>First Name</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Password</th>
                                </tr>
                            </thead>

                            {Doctors.map(doctor =>

                                <tbody key={doctor._id}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountDoctor++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.User_Login}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.Email}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.User_password}</td>


                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="danger" onClick={() => DeleteUser(doctor._id)}>Block</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>

                    </Tab>



                    <Tab eventKey="add new doctor" title="Add new Doctor" className='NewDoctor'>


                        <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ textAlign: "center", alignItems: "center", color: "#4b4b4b" }}>
                            <Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Login</Form.Label>
                                    <Form.Control
                                        style={{ background: "none" }}
                                        type="text"
                                        value={Login}
                                        onChange={(event) => setLogin(event.target.value)}
                                        required />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>First Name</Form.Label>
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
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        style={{ background: "none" }}
                                        type="email"
                                        value={Email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required />
                                </Form.Group>


                                <Form.Group as={Col} md="3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        style={{ background: "none" }}
                                        type="password"
                                        value={Password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required />
                                </Form.Group>

                                <Form.Group as={Col} md="3">
                                    <Form.Label>Confirm Password</Form.Label>
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
                    </Tab>


                    <Tab eventKey="show all Reviews" title="All Reviews" className='AllReviews'>

                        <Table bordered hover size="sm">

                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>First Name</th>
                                    <th style={{ width: "10%", textAlign: "center" }}>Reviews</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Date Published</th>
                                </tr>
                            </thead>

                            {Reviews.map(Review =>

                                <tbody key={Review._id}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountReview++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.textReviews}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.DatePublished}</td>


                                        <td style={{ textAlign: "center", fontSize: "13px", width: "1%" }}>
                                            <Button size="sm" variant="danger" onClick={() => DeleteReview(Review._id)}>Block</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>
                </Tabs>

            </div>
        )
    }



    if (storedTheme === "light") {

        return (

            <div>

                <Tabs id="controlled-tab-example" className="mb-3 tabsChiose " >

                    <Tab eventKey="show all users" title="All Users" className='AllUsers'>

                        <Table striped bordered hover variant="dark" size="sm">

                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Login</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>First Name</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Birthday</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Password</th>
                                </tr>
                            </thead>

                            {Users.map(user =>

                                <tbody key={user._id}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountUser++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_Login}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Email}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Birthday}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_password}</td>


                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="success">Reactive</Button>
                                        </td>

                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="danger" onClick={() => DeleteUser(user._id)}>Block</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>


                    <Tab eventKey="show all users blocked" title="All Users Blocked" className='AllUsersBlocked'>

                        <Table striped bordered hover variant="dark">

                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Login</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>First Name</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Birthday</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Password</th>
                                </tr>
                            </thead>

                            {UsersBlocked.map(user =>

                                <tbody key={user._id}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountUserBlock++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_Login}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Email}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Birthday}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_password}</td>


                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="success" onClick={() => ActiveUser(user._id)}>Reactive</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>


                    <Tab eventKey="show all Doctors" title="All Doctors" className='AllDoctors'>

                        <Table striped bordered hover variant="dark" size="sm">

                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Login</th>
                                    <th style={{ width: "4%", textAlign: "center" }}>First Name</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Password</th>
                                </tr>
                            </thead>

                            {Doctors.map(doctor =>

                                <tbody key={doctor._id}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountDoctor++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.User_Login}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.Email}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.User_password}</td>


                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="danger" onClick={() => DeleteUser(doctor._id)}>Block</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>

                    </Tab>


                    <Tab eventKey="add new doctor" title="Add new Doctor" className='NewDoctor'>


                        <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ textAlign: "center", alignItems: "center", color: "white" }}>
                            <Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Login</Form.Label>
                                    <Form.Control
                                        style={{ background: "white" }}
                                        type="text"
                                        value={Login}
                                        onChange={(event) => setLogin(event.target.value)}
                                        required />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        style={{ background: "white" }}
                                        type="text"
                                        value={FirstName}
                                        onChange={(event) => setFirstName(event.target.value)}
                                        required />
                                </Form.Group>
                            </Row>


                            <Row>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        style={{ background: "white" }}
                                        type="email"
                                        value={Email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required />
                                </Form.Group>


                                <Form.Group as={Col} md="3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        style={{ background: "white" }}
                                        type="password"
                                        value={Password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required />
                                </Form.Group>

                                <Form.Group as={Col} md="3">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        style={{ background: "white" }}
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
                    </Tab>


                    <Tab eventKey="show all Reviews" title="All Reviews" className='AllReviews'>

                        <Table sstriped bordered hover variant="dark" size="sm">

                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>First Name</th>
                                    <th style={{ width: "10%", textAlign: "center" }}>Reviews</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Date Published</th>
                                </tr>
                            </thead>

                            {Reviews.map(Review =>

                                <tbody key={Review._id}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountReview++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.textReviews}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.DatePublished}</td>


                                        <td style={{ textAlign: "center", fontSize: "13px", width: "1%" }}>
                                            <Button size="sm" variant="danger" onClick={() => DeleteReview(Review._id)}>Block</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>

                </Tabs>

            </div>
        )
    }

}


export default Admin;