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
            setValidated(true)

            AddDoctor()

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



    //  take all func from LoadDataFromApi component
    const LoadDetailsFromApi = async () => {

        SetUsers(await LoadAllUsers())
        SetUsersBlocked(await LoadAllUsersBlocked())
        SetDoctors(await LoadAllDoctors())
        SetReviews(await LoadAllReviews())
    }



    // take all func from DeleteDataFromApi component
    const DeleteItemsFromDataApi = async (Id, item) => {

        if (item == "review") {

            await DeleteReview(Id);
            window.location.reload(false);
        }

        if (item == "user") {

            await DeleteUser(Id);
            window.location.reload(false);
        }
    }



    //active all users how was block
    const ActiveUser = async (Id) => {

        await ActiveUserInDataBase(Id);
        window.location.reload(false);
    }



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

        LoadDetailsFromApi();

        Swal.fire({
            background: 'none',
            width: 400,
            showConfirmButton: false,
            timer: 2100,
            html: '<img src="https://i.postimg.cc/KzypDw9n/admin.png" height="200"></img>'
        })
    }, [])



    return (

        <>

            <Tabs id="controlled-tab-example" className="mb-3 tabsChiose " >

                <Tab eventKey="show all users" title="All Users" className='AllUsers'>

                    <Table bordered hover size="sm" variant={(storedTheme === "light") ? "dark" : (storedTheme === "dark") ? "" : ""}>

                        <thead>
                            <tr>
                                <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                <th style={{ width: "1%", textAlign: "center" }}>Login</th>
                                <th style={{ width: "3%", textAlign: "center" }}>First Name</th>
                                <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                <th style={{ width: "3%", textAlign: "center" }}>Birthday</th>
                                <th style={{ width: "3%", textAlign: "center" }}>Password</th>
                                <td style={{ width: "1%" }}></td>
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

                                    <td style={{ textAlign: "center", fontSize: "14px" }}>
                                        <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(user._id, "user")}>Block</Button>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </Table>
                </Tab>


                <Tab eventKey="show all users blocked" title="All Users Blocked" className='AllUsersBlocked'>

                    <Table bordered hover size="sm" variant={(storedTheme === "light") ? "dark" : (storedTheme === "dark") ? "" : ""}>

                        <thead>
                            <tr>
                                <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                <th style={{ width: "1%", textAlign: "center" }}>Login</th>
                                <th style={{ width: "1%", textAlign: "center" }}>First Name</th>
                                <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                <th style={{ width: "3%", textAlign: "center" }}>Birthday</th>
                                <th style={{ width: "3%", textAlign: "center" }}>Password</th>
                                <td style={{ width: "1%" }}></td>
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


                                    <td style={{ textAlign: "center", fontSize: "14px" }}>
                                        <Button size="sm" variant="success" onClick={() => ActiveUser(user._id)}>Reactive</Button>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </Table>
                </Tab>


                <Tab eventKey="show all Doctors" title="All Doctors" className='AllDoctors'>

                    <Table bordered hover size="sm" variant={(storedTheme === "light") ? "dark" : (storedTheme === "dark") ? "" : ""}>

                        <thead>
                            <tr>
                                <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                <th style={{ width: "3%", textAlign: "center" }}>Login</th>
                                <th style={{ width: "4%", textAlign: "center" }}>First Name</th>
                                <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                <th style={{ width: "3%", textAlign: "center" }}>Password</th>
                                <td style={{ width: "1%" }}></td>
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


                                    <td style={{ textAlign: "center", fontSize: "14px" }}>
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
                </Tab>


                <Tab eventKey="show all Reviews" title="All Reviews" className='AllReviews'>

                    <Table bordered hover size="sm" variant={(storedTheme === "light") ? "dark" : (storedTheme === "dark") ? "" : ""}>

                        <thead>
                            <tr>
                                <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                <th style={{ width: "1%", textAlign: "center" }}>First Name</th>
                                <th style={{ width: "10%", textAlign: "center" }}>Reviews</th>
                                <th style={{ width: "1%", textAlign: "center" }}>Date Published</th>
                                <td style={{ width: "1%" }}></td>
                            </tr>
                        </thead>

                        {Reviews.map(Review =>

                            <tbody key={Review._id}>
                                <tr>
                                    <td style={{ textAlign: "center", fontSize: "13px" }}>{CountReview++}</td>
                                    <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.FirstName}</td>
                                    <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.textReviews}</td>
                                    <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.DatePublished}</td>


                                    <td style={{ textAlign: "center", fontSize: "13px" }}>
                                        <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(Review._id, "review")}>Block</Button>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </Table>
                </Tab>

            </Tabs>

        </>
    )

}


export default Admin;