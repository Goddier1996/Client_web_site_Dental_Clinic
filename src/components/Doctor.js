import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Modal, Table } from 'react-bootstrap';
import '../css/profile.css';
import AddMedicalFileUser from '../components/AddMedicalFile';
import Swal from 'sweetalert2';
import { LoadUsersActive_queues, LoadMedicalFileAllUsersHowNeedPay } from '../Api/LoadDataFromApi'

import Button from '@mui/material/Button';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import RateReviewIcon from '@mui/icons-material/RateReview';



//here component Doctor we to do what doctor can do = this component use in profile
//take props doctor user code to show data doctor in profile doctor
function Doctor({ code_doctor }) {


    let storedTheme = localStorage.getItem("theme");


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [medical_File_All_users, SetMedical_File_All_users] = useState([]);

    const [usersActive_queues, SetUsersActive_queues] = useState([]);

    let ClientHowNeedPay = 1;
    let CountClient = 1;



    //update day and hour to null in user + active the hour to ather users can add , at end show popup Doctor send date Medical File to User
    const updateDayHour = (User_code, FirstName, Email) => {

        let date =
        {
            User_code: User_code,
            FirstName: FirstName,
            Email: Email
        }

        sessionStorage.setItem("userDateMedical", JSON.stringify(date))

        //show popup send a file medical to user
        handleShow();
    }



    // load data for doctor from LoadDataFromApi component
    const LoadDataForDoctorFromApi = async () => {

        SetUsersActive_queues(await LoadUsersActive_queues())
        SetMedical_File_All_users(await LoadMedicalFileAllUsersHowNeedPay())
    }



    const hideModelMedicalFile = () => {

        setShow(false);
    }



    useEffect(() => {

        LoadDataForDoctorFromApi()

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
                                    <h4 className="m-t-10 m-b-5">Hello {code_doctor.name} </h4>
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
                                        <td style={{ width: "1%" }}></td>
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
                                            <td style={{ textAlign: "center" }} >
                                                {/* <Button size="sm" variant="success" onClick={() => updateDayHour(user._id, user.FirstName, user.Email)}>Send Medical File</Button> */}
                                                <Button style={{ fontSize: "11px", color: "white", background: "green" }} variant="contained"
                                                    onClick={() => updateDayHour(user._id, user.FirstName, user.Email)} startIcon={<RateReviewIcon />}>
                                                    File
                                                </Button>
                                            </td>
                                        </tr>

                                        <Modal show={show} style={{ background: "rgba(0, 0, 0, 0.70)" }} >

                                            <AddMedicalFileUser hideModelMedicalFile={hideModelMedicalFile} codeHour={user.Serial_codeHour} userCode={user._id} />

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
                                        <th style={{ width: "1%" }}>Need Pay</th>
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
                                            <td style={{ textAlign: "center" }} >
                                                {/* <Button size="sm" variant="secondary" onClick={() => window.location = 'https://mail.google.com'}>send email</Button> */}
                                                <Button style={{ fontSize: "11px", color: "white" }} variant="contained"
                                                    onClick={() => window.location = 'https://mail.google.com'} startIcon={<MarkunreadIcon />}>
                                                    Send
                                                </Button>
                                            </td>
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
                                    <h4 className="m-t-10 m-b-5">Hello {code_doctor.name}</h4>
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
                                        <th style={{ width: "1%" }}></th>
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
                                            <td style={{ textAlign: "center" }} >
                                                {/* <Button size="sm" variant="success" onClick={() => updateDayHour(user._id, user.FirstName, user.Email)}>Send Medical File</Button> */}
                                                <Button style={{ fontSize: "11px", color: "white", background: "green" }} variant="contained"
                                                    onClick={() => updateDayHour(user._id, user.FirstName, user.Email)} startIcon={<RateReviewIcon />}>
                                                    FIle
                                                </Button>
                                            </td>
                                        </tr>

                                        <Modal show={show} style={{ background: "rgba(0, 0, 0, 0.70)" }} >

                                            <AddMedicalFileUser hideModelMedicalFile={hideModelMedicalFile} codeHour={user.Serial_codeHour} userCode={user._id} />

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
                                        <th style={{ width: "1%" }}>Need Pay</th>
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
                                            <td style={{ textAlign: "center" }} >
                                                {/* <Button size="sm" variant="secondary" onClick={() => window.location = 'https://mail.google.com'}>send email</Button> */}
                                                <Button style={{ fontSize: "11px", color: "white" }} variant="contained"
                                                    onClick={() => window.location = 'https://mail.google.com'} startIcon={<MarkunreadIcon />}>
                                                    Send
                                                </Button>
                                            </td>
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