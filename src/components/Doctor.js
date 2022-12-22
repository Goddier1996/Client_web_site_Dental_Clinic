import React from 'react'
import { Tabs, Tab, Button, Modal, Table } from 'react-bootstrap';
import { useState, useEffect } from "react";
import '../css/profile.css'
import { API } from '../API';
import AddMedicalFileUser from '../components/AddMedicalFile'
import Swal from 'sweetalert2'



//here component Doctor we to do what doctor can do = this component use in profile

//take props doctor user code to show data doctor in profile doctor
function Doctor({code_doctor}) {


    let storedTheme = localStorage.getItem("theme");


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [medical_File_All_users, SetMedical_File_All_users] = useState([]);

    const [usersActive_queues, SetUsersActive_queues] = useState([]);

    const [users, SetUser] = useState({});


    let ClientHowNeedPay = 1;
    let CountClient = 1;



    //load data user from data base 
    const LoadUser = async () => {

        let res = await fetch(`${API.USERS.GET}/${code_doctor.code}`, { method: 'GET' });

        let data = await res.json();
        SetUser(data);
    }




    //update day and hour to null in user + active the hour to ather users can add , at end show popup Doctor send date Medical File to User
    const updateDayHour = async (User_code, Serial_codeHour, FirstName, Email) => {

        let date =
        {
            User_code: User_code,
            FirstName: FirstName,
            Email: Email
        }

        sessionStorage.setItem("userDateMedical", JSON.stringify(date))

        //show popup
        handleShow();

        ActiveHour(Serial_codeHour);


        try {
            let user = {
                Day_date: null,
                Hour_day: null,
                Serial_codeHour: null
            }

            await fetch(`${API.USERS.GET}/${User_code}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });


        } catch (error) {
            console.log(error)
        }
    }




    //active the hour in profile page if user dont need this turn , now status was delete after this function was active
    //use in function = updateDayHour
    const ActiveHour = async (Serial_codeHour) => {

        await fetch(`${API.HOURS.GET}/active/${Serial_codeHour}`,
            { method: 'PATCH' }
        );
    }




    //show all users how have a active queues(this option for doctor)
    const LoadUsersActive_queues = async () => {

        let res = await fetch(`${API.USERS.GET}/showTurnUsers`, { method: 'GET' });

        let data = await res.json();
        SetUsersActive_queues(data);
    }




    // load all users medical files what dotor send How need to Pay Service , and doctor can see how need (all users)
    const LoadMedicalFileAllUsers = async () => {

        let res = await fetch(`${API.MEDICAL_FILE.GET}/showHowNeedPay`, { method: 'GET' });

        let data = await res.json();
        SetMedical_File_All_users(data);
    }




    useEffect(() => {
        LoadUser();
        LoadMedicalFileAllUsers();
        LoadUsersActive_queues();

        Swal.fire({
            background: 'none',
            showConfirmButton: false,
            timer: 2100,
            html: '<img src="https://i.postimg.cc/pLT9cd9Z/12.png" height="200"></img>'
        })
    }, [])





    if (storedTheme === "dark") {

        return (

            <div>
                <div className="bg-white">

                    <div className="profile">
                        <div className="profile-headerDoctor">
                            <div className="profile-header-cover"></div>

                            <div className="profile-header-content">
                                <div className="profile-header-info">
                                    <h4 className="m-t-10 m-b-5">Hello Doctor {users.FirstName} </h4>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Tabs id="controlled-tab-example" className="mb-3 tabsChiose " >

                        <Tab eventKey="Active queues (customers)" title="Active queues (customers)" className='ActiveQueues'>


                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "8%", textAlign: "center" }}>Name client</th>
                                        <th style={{ width: "10%", textAlign: "center" }}>Email</th>
                                        <th style={{ width: "10%", textAlign: "center" }}>Day</th>
                                        <th style={{ width: "10%", textAlign: "center" }}>Hour</th>

                                    </tr>
                                </thead>

                                {usersActive_queues.map(user =>

                                    <tbody key={user._id} className='viewDateUser'>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{CountClient++}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.FirstName}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Email}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Day_date}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Hour_day}</td>
                                            <td style={{ width: "7%" }} ><Button size="sm" variant="success" onClick={() => updateDayHour(user._id, user.Serial_codeHour, user.FirstName, user.Email)}>Send Medical File</Button></td>
                                        </tr>

                                        <Modal show={show} style={{ background: "rgba(0, 0, 0, 0.95)" }} >

                                            <AddMedicalFileUser />

                                        </Modal>
                                    </tbody>
                                )}
                            </Table>

                        </Tab>


                        <Tab eventKey="Who should pay" title="Who should pay (users)" className='shouldPay'>


                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "8%", textAlign: "center" }}>Name client</th>
                                        <th style={{ width: "10%", textAlign: "center" }}>Email</th>
                                        <th style={{ width: "5%", textAlign: "center" }}>Date of visit</th>
                                        <th style={{ width: "4%", textAlign: "center" }}>Need Pay</th>
                                    </tr>
                                </thead>

                                {medical_File_All_users.map(user =>

                                    <tbody key={user._id} className='viewDateUser'>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{ClientHowNeedPay++}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.name}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.email}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.priceSevice}</td>
                                            <td style={{ width: "3%" }} ><Button size="sm" variant="secondary" onClick={() => window.location = 'https://mail.google.com'}>send email</Button></td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }



    if (storedTheme == "light") {


        return (
            <div>


                <div>

                    <div className="profile">
                        <div className="profile-headerDoctor">
                            <div className="profile-header-cover"></div>

                            <div className="profile-header-content">

                                <div className="profile-header-info">
                                    <h4 className="m-t-10 m-b-5">Hello Doctor  {users.FirstName}</h4>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Tabs id="controlled-tab-example" className="mb-3 tabsChioseDark " >


                        <Tab eventKey="Active queues (customers)" title="Active queues (customers)" className='ActiveQueues'>


                            <Table striped bordered hover variant="dark" size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "8%", textAlign: "center" }}>Name client</th>
                                        <th style={{ width: "10%", textAlign: "center" }}>Email</th>
                                        <th style={{ width: "10%", textAlign: "center" }}>Day</th>
                                        <th style={{ width: "10%", textAlign: "center" }}>Hour</th>

                                    </tr>
                                </thead>

                                {usersActive_queues.map(user =>

                                    <tbody key={user._id} className='viewDateUser'>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{CountClient++}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.FirstName}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Email}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Day_date}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Hour_day}</td>
                                            <td style={{ width: "7%" }} ><Button size="sm" variant="success" onClick={() => updateDayHour(user._id, user.Serial_codeHour, user.FirstName, user.Email)}>Send Medical File</Button></td>
                                        </tr>

                                        <Modal show={show} style={{ background: "rgba(0, 0, 0, 0.95)" }} >

                                            <AddMedicalFileUser />

                                        </Modal>
                                    </tbody>
                                )}
                            </Table>

                        </Tab>


                        <Tab eventKey="Who should pay" title="Who should pay (users)" className='shouldPay'>


                            <Table striped bordered hover variant="dark" size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "8%", textAlign: "center" }}>Name client</th>
                                        <th style={{ width: "10%", textAlign: "center" }}>Email</th>
                                        <th style={{ width: "5%", textAlign: "center" }}>Date of visit</th>
                                        <th style={{ width: "4%", textAlign: "center" }}>Need Pay</th>
                                    </tr>
                                </thead>

                                {medical_File_All_users.map(user =>

                                    <tbody key={user._id} className='viewDateUser'>
                                        <tr>
                                            <td>{ClientHowNeedPay++}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.name}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.email}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.priceSevice}</td>
                                            <td style={{ width: "3%" }} ><Button size="sm" variant="secondary" onClick={() => window.location = 'https://mail.google.com'}>send email</Button></td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>

                        </Tab>

                    </Tabs>

                </div>

            </div>
        )
    }

}



export default Doctor;