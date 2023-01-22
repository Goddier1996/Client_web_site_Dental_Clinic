import React, { useState } from 'react';
import { Tabs, Tab, Modal, Table } from 'react-bootstrap';
import '../css/profile.css';
import AddMedicalFileUser from '../components/AddMedicalFile';
import Swal from 'sweetalert2';
import { LoadUsersActive_queues, LoadMedicalFileAllUsersHowNeedPay } from '../Api/LoadDataFromApi'
import Button from '@mui/material/Button';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import RateReviewIcon from '@mui/icons-material/RateReview';
import NotFoundPage from '../components/NotFoundPage'
import { useQueryOnlyLoadingData } from "../customHook/customQueryHook"



//here component Doctor we to do what doctor can do = this component use in profile
//take props doctor user code to show data doctor in profile doctor
function Doctor({ code_doctor }) {


    let storedTheme = localStorage.getItem("theme");

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    let ClientHowNeedPay = 1;
    let CountClient = 1;


    // use custom hook , useQuery
    const { isLoading: UsersActive_queues, data: usersActive_queues, isError: ErrorActive_queues } =
        useQueryOnlyLoadingData('Active_queues', LoadUsersActive_queues, null);

    const { isLoading: Medical_File_All_users, data: medical_File_All_users, isError: ErrorFile_All_users } =
        useQueryOnlyLoadingData('medical_FileUsers', LoadMedicalFileAllUsersHowNeedPay, null);




    //update day and hour to null in user + active the hour to anther users can add , at end show popup Doctor send date Medical File to User
    const updateDayHour = (User_code, FirstName, Email, codeHour, Day) => {

        let date = new Date();
        let takeDay = date.getDay();
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let todayDay = weekday[takeDay];


        if (todayDay == Day) {

            let data =
            {
                User_code: User_code,
                FirstName: FirstName,
                Email: Email,
                CodeHour: codeHour
            }

            sessionStorage.setItem("userDateMedical", JSON.stringify(data))
            //show popup send a file medical to user
            handleShow();
        }


        else {

            Swal.fire({
                title: `Can't Send File Pay`,
                icon: 'warning',
                text: `${FirstName} Turn at Day ${Day} , And You Can't send Pay FIle !`,
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
    }



    const hideModelMedicalFile = () => {

        // setShow(false);
        sessionStorage.removeItem("userDateMedical");
        window.location.reload(false);
    }




    return (

        <>
            {(UsersActive_queues || Medical_File_All_users) ?
                <div className='loadingReview'>
                    <img src="https://i.postimg.cc/pLT9cd9Z/12.png" />
                </div>
                :
                (ErrorActive_queues || ErrorFile_All_users) ?
                    <>
                        <NotFoundPage />
                    </>
                    :
                    <>
                        <div className={(storedTheme === "light") ? "" : (storedTheme === "dark") ? "bg-white" : ""}>

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

                            <Tabs id="controlled-tab-example" className={(storedTheme === "light") ? "mb-3 tabsChioseDark" : (storedTheme === "dark") ? "mb-3 tabsChiose" : ""} >

                                <Tab eventKey="Active queues (customers)" title="Active queues (customers)" className='ActiveQueues'>

                                    <Table striped bordered hover size="sm" variant={(storedTheme === "light") ? "dark" : (storedTheme === "dark") ? "" : ""}>
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
                                                    <td style={{ textAlign: "center", fontSize: "14px" }} >
                                                        <Button style={{ fontSize: "11px", color: "white", background: "green" }} variant="contained"
                                                            onClick={() => updateDayHour(user._id, user.FirstName, user.Email, user.Serial_codeHour, user.Day_date)}
                                                            startIcon={<RateReviewIcon />}>
                                                            File
                                                        </Button>
                                                    </td>
                                                </tr>

                                                <Modal show={show}  >
                                                    <AddMedicalFileUser hideModelMedicalFile={hideModelMedicalFile} />
                                                </Modal>
                                            </tbody>
                                        )}
                                    </Table>

                                </Tab>


                                <Tab eventKey="Who should pay" title="Who should pay (users)" className='shouldPay'>

                                    <Table striped bordered hover size="sm" variant={(storedTheme === "light") ? "dark" : (storedTheme === "dark") ? "" : ""}>
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
                                                    <td style={{ textAlign: "center", fontSize: "14px" }}>{user.priceSevice} $</td>
                                                    <td style={{ textAlign: "center", fontSize: "14px" }} >
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
                    </>
            }
        </>
    )

}


export default Doctor;