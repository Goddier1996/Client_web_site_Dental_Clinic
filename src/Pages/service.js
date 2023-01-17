import React, { useState } from 'react'
import { Row, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import '../css/service.css'
import Swal from 'sweetalert2'
import { LoadReviews } from '../Api/LoadDataFromApi'
import { AddNewReviews, AddNewLikeReviews } from '../Api/ConnectOrAddFromApi'
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useQuery } from 'react-query'



//here we show Reviews and like and add them
function Service() {


    const [showAddReviews, setShowAddReviews] = useState(false);
    const handleCloseAddReviews = () => setShowAddReviews(false);
    const handleShowAddReviews = () => setShowAddReviews(true);

    const [textReviews, setTextReviews] = useState('');

    let userData = JSON.parse(sessionStorage.getItem("user"));
    let storedTheme = localStorage.getItem("theme");


    const { isLoading: LoadingReviews, data: showReviews } = useQuery('reviews', () => {

        return LoadReviews();
    })



    //check if user connect , if yes ew can add new review
    const CheckUserConnected = () => {

        if (userData == null && storedTheme === "dark") {

            Swal.fire({
                icon: 'warning',
                title: 'Login/Register',
                html: 'You need to log in or register, you should add a comment',
                toast: true,
                position: 'top-end',
                confirmButtonColor: "green",
            })
            return;
        }

        if (userData == null && storedTheme === "light") {

            Swal.fire({
                icon: 'warning',
                title: 'Login/Register',
                html: 'You need to log in or register, and you should book an appointment',
                toast: true,
                position: 'top-end',
                background: '#373E44',
                confirmButtonColor: "green",
                color: '#ffffffab',
                buttonColor: '#E96E00'
            })

            return;
        }

        if (userData != null) {
            handleShowAddReviews();
        }
    }




    //add review to data base
    const addReviews = async () => {

        if (textReviews < 1) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...you don`t input Reviews!',
                toast: true,
                position: 'top-end'
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


            if (storedTheme === "dark") {

                await Swal.fire({
                    title: 'Added a comment successfully',
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                })
                window.location.reload(false);
            }

            if (storedTheme === "light") {

                await Swal.fire({
                    title: 'Added a comment successfully',
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    background: '#373E44',
                    color: '#ffffffab'
                })
                window.location.reload(false);
            }
        }
    }




    //add likes to review what user chiose
    const addReviewsLike = async (likeReview, Serial_code) => {

        if (userData != null) {

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
                Count_likes: [likeReview]
            };

            await AddNewLikeReviews(user, Serial_code);
            window.location.reload(false);
        }

        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...Please connect and you can add like (:',
                toast: true,
                position: 'top-end',
                confirmButtonColor: "green",
            })
            return;
        }

    }




    if (LoadingReviews) {
        return (

            <div className='loadingReview'>
                <img src="https://media3.giphy.com/media/lMl2tZmYHhrJHvY4rP/200w.gif?cid=82a1493bv5vympwzpd0gt9did8lb8r9vlei1poc0gx1gw4zx&rid=200w.gif&ct=s"></img>
            </div>
        )
    }



    if (storedTheme === "light") {

        return (

            <div>
                <div className='titleOurReviewDark'>
                    <h1>Reviews of our clinic :</h1>
                </div>

                <div className="d-grid gap-2 addReviews" >
                    <button className="button-55Dark" role="button" onClick={CheckUserConnected}>Add new Review</button>
                </div>


                <div>
                    <Modal show={showAddReviews} onHide={handleCloseAddReviews}>

                        <div className="cardModelAddNewReviewDark">

                            <div className="closeModelAddReview">
                                <Button style={{ background: "#424242" }} variant="contained" onClick={handleCloseAddReviews} >
                                    <CloseIcon style={{ fontSize: "20px", color: "white" }} />
                                </Button>
                            </div>

                            <div className='titleHeater'>
                                <h1>Add New Review <RateReviewIcon style={{ fontSize: "30px" }} /></h1>
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

                            <div className='buttonAddNewReviewOrCLose'>

                                <Button style={{ fontSize: "12px", color: "white" }} variant="contained"
                                    onClick={addReviews} startIcon={<AddIcon />}>
                                    Add a Review
                                </Button>

                            </div>

                        </div>
                    </Modal>
                </div>


                <div className='space'></div>

                <div className='OurReviews'>

                    <Row xs={1} md={2} lg={3} className="g-4">

                        {showReviews.sort((a, b) => b.Count_likes.length - a.Count_likes.length).map((record) => (

                            <div key={record._id} className="testimonial-box-container">

                                <div className="testimonial-box">

                                    <div className="box-top">

                                        <div className="profileReviews">

                                            <div className="nameInfo-userInfo">
                                                <span>Name : {record.FirstName}</span>

                                                <span>Login : @{record.User_Login}</span>
                                            </div>
                                        </div>

                                        <div className="reviews">
                                            <p>{record.DatePublished}</p>
                                        </div>
                                    </div>


                                    <div className="client-comment">
                                        <p>{record.textReviews}</p>
                                    </div>


                                    <div className='clickLike'>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Like👍🏼</Tooltip>}>

                                            <button className="button-30" role="button"
                                                onClick={() => addReviewsLike(record.FirstName, record._id)}>
                                                <i className="far fa-thumbs-up"></i> {record.Count_likes.length}
                                            </button>

                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Row>
                </div>
            </div>
        );
    }



    if (storedTheme === "dark") {

        return (
            <div>
                <div className='titleOurReview'>
                    <h1>Reviews of our clinic :</h1>
                </div>

                <div className="d-grid gap-2 addReviews">
                    <button className="button-55" role="button" onClick={CheckUserConnected}>Add new Review</button>
                </div>


                <div>
                    <Modal show={showAddReviews} onHide={handleCloseAddReviews} >

                        <div className="cardModelAddNewReview">

                            <div className="closeModelAddReview">
                                <Button style={{ background: "white" }} variant="contained" onClick={handleCloseAddReviews} >
                                    <CloseIcon style={{ fontSize: "20px", color: "black" }} />
                                </Button>
                            </div>

                            <div className='titleHeater'>
                                <h1 style={{ color: "#00000094" }}>Add New Review <RateReviewIcon style={{ fontSize: "30px" }} /></h1>
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

                            <div className='buttonAddNewReviewOrCLose'>

                                <Button style={{ fontSize: "13px", color: "white", background: "green" }} variant="contained"
                                    onClick={addReviews} startIcon={<AddIcon />}>
                                    Add a Review
                                </Button>

                            </div>

                        </div>
                    </Modal>
                </div>

                <div className='space'></div>



                <div className='OurReviews'>

                    <Row xs={1} md={2} lg={3} className="g-4">

                        {showReviews.sort((a, b) => b.Count_likes.length - a.Count_likes.length).map((record) => (

                            <div key={record._id} className="testimonial-box-container">

                                <div className="testimonial-box">

                                    <div className="box-top">

                                        <div className="profileReviews">

                                            <div className="nameInfo-userInfo">
                                                <span>Name : {record.FirstName}</span>

                                                <span>Login : @{record.User_Login}</span>
                                            </div>
                                        </div>

                                        <div className="reviews">
                                            <p>{record.DatePublished}</p>
                                        </div>
                                    </div>


                                    <div className="client-comment">
                                        <p>{record.textReviews}</p>
                                    </div>


                                    <div className='clickLike'>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Like👍🏼</Tooltip>}>

                                            <button className="button-30" role="button"
                                                onClick={() => addReviewsLike(record.FirstName, record._id)}>
                                                <i className="far fa-thumbs-up"></i> {record.Count_likes.length}
                                            </button>

                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Row>
                </div>
            </div>
        );
    }

}

export default Service;