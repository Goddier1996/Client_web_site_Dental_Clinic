import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Button, Row, Form, Col, Table } from 'react-bootstrap';
import '../css/profile.css'
import Swal from 'sweetalert2'
import { LoadAllUsers, LoadAllUsersBlocked, LoadAllDoctors, LoadAllReviews } from '../Api/LoadDataFromApi'
import { DeleteUser, DeleteReview, ActiveUserInDataBase } from '../Api/DeleteUpdateDataFromApi'
import { AddNewUserRegester } from '../Api/ConnectOrAddFromApi'




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



    // load data from LoadDataFromApi component
    const LoadCountDetailsFromApi = async () => {

        SetUsers(await LoadAllUsers())
        SetUsersBlocked(await LoadAllUsersBlocked())
        SetDoctors(await LoadAllDoctors())
        SetReviews(await LoadAllReviews())
    }



    // delete items from DeleteDataFromApi component
    const DeleteItemsFromDataApi = async (Id, item) => {

        if (item == "review") {

            await DeleteReview(Id)
        }

        if (item == "user") {

            await DeleteUser(Id);
        }
    }



    //active all users how was block
    const ActiveUser = async (Id) => {

        await ActiveUserInDataBase(Id);
        window.location.reload(false);
    }



    //add a new doctor to data base
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




    useEffect(() => {

        LoadCountDetailsFromApi();

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
                                            <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(user._id, "user")}>Block</Button>
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
                                            <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(doctor._id, "user")}>Block</Button>
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
                                            <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(Review._id, "review")}>Block</Button>
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
                                            <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(user._id, "user")}>Block</Button>
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
                                            <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(doctor._id, "user")}>Block</Button>
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
                                            <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(Review._id, "review")}>Block</Button>
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