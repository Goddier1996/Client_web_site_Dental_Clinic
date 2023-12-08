import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import { UpdateDataUserRemoveTurn, ActiveHourInDataBase } from '../../../../Api/DeleteUpdateDataFromApi'
import { useHistory } from 'react-router-dom';



const UserQueues = ({ day, data_user }) => {


    let storedTheme = localStorage.getItem("theme");
    let userData = JSON.parse(sessionStorage.getItem("user"));

    let history = useHistory();



    const ActiveHourIfUserDontNeedTurn = () => {

        Swal.fire({
            title: 'Are you sure you want to cancel the queue?',
            icon: 'question',
            showDenyButton: true,
            confirmButtonText: 'yes',
            denyButtonText: `no`,
            toast: true,
            position: 'top-end',
            confirmButtonColor: "green",
            background: `${(storedTheme === "light") ? "#373E44" :
                (storedTheme === "dark") ? "" : ""}`,
            color: `${(storedTheme === "light") ? "#ffffffab" :
                (storedTheme === "dark") ? "" : ""}`,
            buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                (storedTheme === "dark") ? "" : ""}`
        }).then((result) => {

            if (result.isConfirmed) {

                ActiveHourInDataBase(data_user.codeHour);
                saveDateUserAfterActiveHour();
            }

            else if (result.isDenied) {
                window.location.reload(false);
            }
        })
    }



    //update to NULL day + hour + serial code hour
    const saveDateUserAfterActiveHour = async () => {

        await UpdateDataUserRemoveTurn(data_user.code);

        // clear session storage after delete a hour day and serial code hour
        sessionStorage.clear();
        history.push("/");
        window.location.reload(false);
    }




    return (
        <>
            <Modal.Dialog className={(storedTheme === "light") ? "showMyQueuesDark" : (storedTheme === "dark") ? "showMyQueues" : ""}>

                {(day == null) ?
                    <>
                        <Modal.Body>
                            <p>You Don't Have Queues ! <br />
                                Go to the home page, and order by clicking the queue button. <br />
                                Or <br />
                                Click <a style={{ textDecoration: "none", fontWeight: "bold" }} href='/'>Home Page</a>
                            </p>
                        </Modal.Body>
                    </>


                    : (day != null) ?
                        <>
                            <Modal.Body>
                                <div style={(storedTheme === "light") ? { marginTop: "-20%", color: "white" } :
                                    (storedTheme === "dark") ? { marginTop: "-20%" } : ""}>
                                    <h6>Your Queues :</h6>
                                    <br />
                                    Day : {userData.Day_date}
                                    <br />
                                    Hour : {userData.Hour_day}
                                    <br /><br />
                                    <h6 style={(storedTheme === "light") ? { fontSize: "13px", color: "white" } :
                                        (storedTheme === "dark") ? { fontSize: "13px", color: "black" } : ""}>
                                        if you don`t need this queue Please cancel !
                                    </h6>
                                </div>
                            </Modal.Body>

                            <Modal.Footer className='ButtonQueues'>
                                <Button style={{ fontSize: "12px", color: "white", background: "green" }} variant="contained"
                                    onClick={() => ActiveHourIfUserDontNeedTurn()} startIcon={<CloseIcon />}>
                                    Delete Queues
                                </Button>
                            </Modal.Footer>
                        </> : ""
                }
            </Modal.Dialog>
        </>
    )
}

export default UserQueues;