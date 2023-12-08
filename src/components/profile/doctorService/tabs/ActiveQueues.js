import React, { useState } from 'react'
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Modal, Table } from 'react-bootstrap';
import AddMedicalFileUser from '../AddMedicalFile';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'


const ActiveQueues = ({ usersActive_queues }) => {


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    let CountClient = 1;
    let storedTheme = localStorage.getItem("theme");



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

        sessionStorage.removeItem("userDateMedical");
        window.location.reload(false);
    }



    return (
        <>
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
        </>
    )
}

export default ActiveQueues;