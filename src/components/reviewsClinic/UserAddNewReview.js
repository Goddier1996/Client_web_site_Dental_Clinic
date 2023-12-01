import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import '../../css/service.css'
import Swal from 'sweetalert2'
import { AddNewReviews } from '../../Api/ConnectOrAddFromApi'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Button from '@mui/material/Button';
import RobotBox from '../ReCAPTCHA/RobotBox'



const UserAddNewReview = ({ closePopUp }) => {


    const [textReviews, setTextReviews] = useState('');

    let userData = JSON.parse(sessionStorage.getItem("user"));
    let storedTheme = localStorage.getItem("theme");

    // check box if user not robot
    const [capVal, setCapVal] = useState(false);


    const addReviews = async () => {

        if (textReviews < 1) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...you don`t input Reviews!',
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


        else {

            let Publish_by = userData._id;
            let FirstName = userData.FirstName;
            let User_Login = userData.User_Login;

            let d = new Date();

            let user = {
                textReviews,
                DatePublished: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
                Publish_by,
                FirstName,
                User_Login,
                IsActive: "1",
                Count_likes: []
            };

            await AddNewReviews(user);

            await Swal.fire({
                title: 'Added a comment successfully',
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                background: `${(storedTheme === "light") ? "#373E44" :
                    (storedTheme === "dark") ? "" : ""}`,
                color: `${(storedTheme === "light") ? "#ffffffab" :
                    (storedTheme === "dark") ? "" : ""}`,
                buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                    (storedTheme === "dark") ? "" : ""}`
            })
            closePopUp();
            setTextReviews('');
            setCapVal(false);
        }
    }



    return (

        <>
            <div className={(storedTheme === "light") ? "cardModelAddNewReviewDark" : (storedTheme === "dark") ? "cardModelAddNewReview" : ""}>

                <div className="closeModelAddReview">

                    <Button style={(storedTheme === "light") ? { background: "#424242" } :
                        (storedTheme === "dark") ? { background: "white" } : ""}
                        variant="contained"
                        onClick={() => closePopUp()} >

                        <CloseIcon style={(storedTheme === "light") ? { fontSize: "20px", color: "white" } :
                            (storedTheme === "dark") ? { fontSize: "20px", color: "black" } : ""}
                            variant="contained"
                            onClick={() => closePopUp()} />
                    </Button>

                </div>

                <div className='titleHeater'>
                    <h1 style={(storedTheme === "light") ? { color: "white" } :
                        (storedTheme === "dark") ? { color: "#00000094" } : ""}>
                        Add New Review <RateReviewIcon style={{ fontSize: "30px" }} />
                    </h1>
                </div>

                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={3}
                                value={textReviews}
                                onChange={(event) => setTextReviews(event.target.value)}
                                autoFocus
                                placeholder='input your Review'
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>


                {/* check robot box if user don't robot */}
                <>
                    <RobotBox activeRobotBox={() => setCapVal(true)} />
                </>


                <div className='buttonAddNewReviewOrCLose' style={!capVal ? { cursor: "not-allowed" } : {}}>
                    <Button style={{ fontSize: "12px", color: "white" }}
                        disabled={!capVal}
                        variant="contained"
                        onClick={addReviews} startIcon={<AddIcon />}>
                        Add a Review
                    </Button>
                </div>

            </div>
        </>
    )
}

export default UserAddNewReview;