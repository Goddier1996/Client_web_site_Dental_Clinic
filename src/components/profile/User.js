import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Modal, Form, Col, Row, Table } from 'react-bootstrap';
import '../../css/profile.css'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import PayService from './userService/PayService'
import { LoadMedicalFileUser, showAllMyReview, LoadMedicalFileUserIsNotActive } from '../../Api/LoadDataFromApi'
import { DeleteReview, UpdateDataUserRemoveTurn, ActiveHourInDataBase, UpdateDataUser } from '../../Api/DeleteUpdateDataFromApi'
import { alertPopUpIfUserHaveTodayTurn } from '../addAppointment/AlertUserHaveTurnToday'
import Button from '@mui/material/Button';
import PaymentIcon from '@mui/icons-material/Payment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import CloseIcon from '@mui/icons-material/Close';
import { useQueryOnlyLoadingData, useQueryDataLoadingRefetchAutoData } from "../../customHook/customQueryHook"
import NotFoundPage from '../tools/NotFoundPage'
import { motion as m } from "framer-motion/dist/framer-motion"



//data_user - take all data user from Page Profile (user)
function User({ data_user }) {


    // popup pay service
    const [showPayService, setShowPayService] = useState(false);
    const handleShowPayService = () => setShowPayService(true);

    let history = useHistory();

    let CountReview = 1;
    let HistoryPayFile = 1;
    let MyReviews = 1;

    let storedTheme = localStorage.getItem("theme");
    let userData = JSON.parse(sessionStorage.getItem("user"));


    // use custom hook , useQuery
    const { isLoading: MyReview, data: myReview, isError: ErrorMyReview } =
        useQueryDataLoadingRefetchAutoData('myReview', null, showAllMyReview, data_user.code);

    const { isLoading: Medical_File, data: medical_File, isError: ErrorMedical_File } =
        useQueryOnlyLoadingData('medical_File', LoadMedicalFileUser, data_user.code);

    const { isLoading: Medical_File_Is_Not_Active, data: medical_File_Is_Not_Active, isError: ErrorMedical_File_Is_Not_Active } =
        useQueryOnlyLoadingData('medical_File_Is_Not_Active', LoadMedicalFileUserIsNotActive, data_user.code);



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



    const DeleteReviewUser = async (Id) => {

        await Swal.fire({
            title: 'you delete this Review',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            toast: true,
            position: 'top-end',
            background: `${(storedTheme === "light") ? "#373E44" :
                (storedTheme === "dark") ? "" : ""}`,
            color: `${(storedTheme === "light") ? "#ffffffab" :
                (storedTheme === "dark") ? "" : ""}`,
            buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                (storedTheme === "dark") ? "" : ""}`
        })

        await DeleteReview(Id);
        // window.location.reload(false);
    }



    //open pop up pay service , save the data to sessionStorage , to use in component PayService
    const OpenPopUpPay = (Serial_code, priceSevice, FirstName) => {

        handleShowPayService();

        let PayDetails = { Serial_code: Serial_code, priceSevice: priceSevice, userName: FirstName }

        sessionStorage.setItem("PayDetails", JSON.stringify(PayDetails))
    }



    // send this function to PayService component
    const hideModelPayService = () => {

        sessionStorage.removeItem("PayDetails");
        window.location.reload(false);
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

            {(MyReview || Medical_File || Medical_File_Is_Not_Active) ?
                <div className='loadingCountPersonalClinic'>
                    <img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!f305cw" />
                </div>
                :
                (ErrorMyReview || ErrorMedical_File || ErrorMedical_File_Is_Not_Active) ?
                    <>
                        <NotFoundPage />
                    </>
                    :
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        // initial={{ y:"100%" }}
                        // animate={{ y:"0%" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.75, ease: "easeOut" }}>
                        <div className={(storedTheme === "light") ? "" : (storedTheme === "dark") ? "bg-white" : ""}>

                            <Tabs id="controlled-tab-example" className={(storedTheme === "light") ? "mb-3 tabsChioseDark" : (storedTheme === "dark") ? "mb-3 tabsChiose" : ""} >

                                <Tab eventKey="My queues" title="My queues" className={(storedTheme === "light") ? "QueuesDark" : (storedTheme === "dark") ? "Queues" : ""}>

                                    <Modal.Dialog className={(storedTheme === "light") ? "showMyQueuesDark" : (storedTheme === "dark") ? "showMyQueues" : ""}>

                                        {(data_user.day == null) ?
                                            <>
                                                <Modal.Body>
                                                    <p>You Don't Have Queues ! <br />
                                                        Go to the home page, and order by clicking the queue button. <br />
                                                        Or <br />
                                                        Click <a style={{ textDecoration: "none", fontWeight: "bold" }} href='/'>Home Page</a>
                                                    </p>
                                                </Modal.Body>
                                            </>


                                            : (data_user.day != null) ?
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
                                </Tab>


                                <Tab eventKey="medical File" title="Medical File + Pay service" className='Medical'>

                                    <Table striped bordered hover size="sm" variant={(storedTheme === "light") ? "dark" : (storedTheme === "dark") ? "" : ""}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                                <th style={{ width: "3%", textAlign: "center" }}>Date Publish</th>
                                                <th style={{ width: "18%", textAlign: "center" }}>Doctor's response</th>
                                                <th style={{ width: "3%", textAlign: "center" }}>Price Service</th>
                                                <td style={{ width: "1%" }}></td>
                                                <td style={{ width: "1%" }}></td>
                                            </tr>
                                        </thead>

                                        {medical_File.map(File =>

                                            <tbody key={File._id}>
                                                <tr>
                                                    <td style={{ textAlign: "center", fontSize: "14px" }}>{CountReview++}</td>
                                                    <td style={{ textAlign: "center", fontSize: "14px" }}>{File.Date_published}</td>
                                                    <td style={{ textAlign: "center", fontSize: "14px" }}>{File.textDoctor}</td>
                                                    <td style={{ textAlign: "center", fontSize: "14px" }}>{File.priceSevice} $</td>

                                                    <td style={{ textAlign: "center", fontSize: "14px" }}>
                                                        <Button style={{ fontSize: "11px", background: "gray", color: "white" }} variant="contained" href={File.File_user} startIcon={<AttachFileIcon />}>
                                                            File
                                                        </Button>
                                                    </td>

                                                    <td style={{ textAlign: "center", fontSize: "14px" }}>
                                                        <Button style={{ fontSize: "11px" }} variant="contained" onClick={() => OpenPopUpPay(File._id, File.priceSevice, File.name)} startIcon={<PaymentIcon />}>
                                                            Pay
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </tbody>

                                        )}
                                    </Table>

                                    <Modal show={showPayService} onHide={hideModelPayService} >
                                        <PayService hideModelPayService={hideModelPayService} />
                                    </Modal>

                                </Tab>


                                <Tab eventKey="History (medical File)" title="History (Medical File)" className='HistoryMedical'>

                                    <Table striped bordered hover size="sm" variant={(storedTheme === "light") ? "dark" : (storedTheme === "dark") ? "" : ""}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                                <th style={{ width: "3%", textAlign: "center" }}>Date Publish</th>
                                                <th style={{ width: "18%", textAlign: "center" }}>Doctor's response</th>
                                                <th style={{ width: "3%", textAlign: "center" }}>Price Service</th>
                                                <td style={{ width: "1%" }}></td>
                                            </tr>
                                        </thead>

                                        {medical_File_Is_Not_Active.map(File =>

                                            <tbody key={File._id}>
                                                <tr>
                                                    <td style={{ textAlign: "center", fontSize: "14px" }}>{HistoryPayFile++}</td>
                                                    <td style={{ textAlign: "center", fontSize: "12px" }}>{File.Date_published}</td>
                                                    <td style={{ textAlign: "center", fontSize: "14px" }}>{File.textDoctor}</td>
                                                    <td style={{ textAlign: "center", fontSize: "14px" }}>{File.priceSevice} $</td>

                                                    <td style={{ textAlign: "center", fontSize: "14px" }}>
                                                        <Button style={{ fontSize: "11px", background: "gray", color: "white" }} variant="contained" href={File.File_user} startIcon={<AttachFileIcon />}>
                                                            File
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )}
                                    </Table>
                                </Tab>


                                <Tab eventKey="My Comments" title="My Comments (Reviews)" className='Comments'>

                                    <Table striped bordered hover size="sm" variant={(storedTheme === "light") ? "dark" : (storedTheme === "dark") ? "" : ""}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                                <th style={{ width: "18%", textAlign: "center" }}>Date Publish</th>
                                                <th style={{ textAlign: "center" }}>Review</th>
                                                <th style={{ width: "1%" }}></th>
                                            </tr>
                                        </thead>

                                        {myReview.map(Review =>

                                            <tbody key={Review._id}>
                                                <tr>
                                                    <td style={{ textAlign: "center", fontSize: "14px" }}>{MyReviews++}</td>
                                                    <td style={{ textAlign: "center", fontSize: "12px" }}>{Review.DatePublished}</td>
                                                    <td style={{ textAlign: "center", fontSize: "14px" }}>{Review.textReviews}</td>
                                                    <td style={{ textAlign: "center", fontSize: "14px" }}>

                                                        <Button style={{ fontSize: "11px", background: "red", color: "white" }} variant="contained" onClick={() => DeleteReviewUser(Review._id)}
                                                            startIcon={<DeleteIcon />}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )}
                                    </Table>
                                </Tab>


                                <Tab eventKey="personal data" title="Personal Data (Update)" className='updateDateUser'>

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

                                </Tab>

                            </Tabs>

                        </div>
                    </m.div>
            }
        </>
    )

}


export default User;
