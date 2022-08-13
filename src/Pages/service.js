import React from 'react'
import { Row, Button, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import '../css/service.css'
import { API } from '../API';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'



//here we show Reviews and like and add them
function service() {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [textReviews, setTextReviews] = useState('');
    const [reviews, SetReviews] = useState([])

    let userData = JSON.parse(sessionStorage.getItem("user"));
    let storedTheme = localStorage.getItem("theme");



    // load all reviews all users from data base node js + mySql

    const LoadReviews = async () => {

        let res = await fetch(API.REVIEWS.GET, { method: 'GET' });
        let data = await res.json();

        SetReviews(data);
    }



    //check if user connect , if yes ew can add new review

    const CheckUserConnected = () => {

        if (userData == null && storedTheme === "dark") {
            Swal.fire({
                icon: 'warning',
                title: 'Login/Register',
                html: 'You need to log in or register, you should add a comment',
                toast: true,
                position: 'top-end',
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
                color: '#ffffffab',
                buttonColor: '#E96E00'
            })

            return;
        }

        if (userData != null) {
            handleShow();
        }
    }




    //add review to data base node js + mySql

    const addReviews = async () => {

        if (textReviews < 1) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...you don`t input Reviews!',
                toast: true,
                position: 'top-end'
            })

            return
        }


        else {

            try {
                let Publish_by = userData.User_code;

                let d = new Date();

                let user = {
                    textReviews,
                    DatePublished: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate() + 1}`,
                    Publish_by
                };

                await fetch(API.REVIEWS.ADD, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });


                if (storedTheme === "dark") {

                    Swal.fire({
                        title: 'Added a comment successfully',
                        icon: 'success',
                        toast: true,
                        position: 'top-end',

                    }).then((result) => {

                        if (result.isConfirmed) {
                            window.location.reload(false);
                        }
                    })
                }

                if (storedTheme === "light") {

                    Swal.fire({
                        title: 'Added a comment successfully',
                        icon: 'success',
                        toast: true,
                        position: 'top-end',

                    }).then((result) => {

                        if (result.isConfirmed) {
                            window.location.reload(false);
                        }
                    })
                }


            } catch (error) {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })

                console.log(error);
            }
        }

    }



    //add likes to review what user chiose

    const addReviewsLike = async (likeReview, Serial_code) => {


        try {

            let like = {
                how_like: likeReview,
                Serial_code_how_Like: Serial_code
            };

            await fetch(API.REVIEWS.ADD_LIKE, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(like)
            });

            window.location.reload(false);


        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })

            console.log(error);
        }
    }



    //here we show pop up ui/ux when load this page

    useEffect(() => {

        Swal.fire({
            title: '<img src="https://media3.giphy.com/media/lMl2tZmYHhrJHvY4rP/200w.gif?cid=82a1493bv5vympwzpd0gt9did8lb8r9vlei1poc0gx1gw4zx&rid=200w.gif&ct=s" height="170"></img>',
            background: 'none',
            showConfirmButton: false,
            timer: 9000,
        })

        LoadReviews();

    }, [])



    if (storedTheme === "light") {

        return (

            <div>
                <div className='titleOurReviewDark'>
                    <h1>Reviews of our clinic :</h1>
                </div>

                <div className="d-grid gap-2 addReviews" >
                    <button class="button-55Dark" role="button" onClick={CheckUserConnected}>Add new Review</button>
                </div>


                <div>
                    <Modal show={show} onHide={handleClose} style={{ background: "rgba(0, 0, 0, 0.8)" }}>
                        <Modal.Header className='titleHeater'>
                            <Modal.Title><h1>Here you can Add New Review :</h1></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={3}
                                        value={textReviews}
                                        onChange={(event) => setTextReviews(event.target.value)} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="success" onClick={addReviews}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>


                <div className='space'></div>

                <div className='OurReviews'>

                    <Row xs={1} md={2} lg={3} className="g-4">
                        {reviews.sort((a, b) => b.Count_likes - a.Count_likes).map((record) => (


                            <div class="testimonial-box-container">

                                <div class="testimonialDark-box">

                                    <div class="box-top">

                                        <div class="profileReviews">


                                            <div class="nameInfoDark-userInfo">
                                                <span>Name : {record.FirstName}</span>

                                                <span>Login : @{record.User_Login}</span>
                                            </div>
                                        </div>

                                        <div class="reviewsDark">
                                            <p>{record.DatePublished}</p>
                                        </div>
                                    </div>

                                    <div class="client-comment">
                                        {/* <h6>Opinion :</h6> */}
                                        <p>{record.textReviews}</p>
                                    </div>

                                    <div className='clickLike'>

                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Like (:</Tooltip>}>

                                            <button class="button-30" role="button"
                                                onClick={() => addReviewsLike(record.FirstName, record.Serial_code)}>
                                                <i class="far fa-thumbs-up"></i> {record.Count_likes}
                                            </button>
                                            {/* <button class="like__btn" onClick={() => addReviewsLike(record.FirstName, record.Serial_code)}>
    <span id="icon"><i class="far fa-thumbs-up"></i></span>
    <span id="count">{record.Count_likes}</span> Like
</button> */}
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



    else {

        return (
            <div>
                <div className='titleOurReview'>
                    <h1>Reviews of our clinic :</h1>
                </div>

                <div className="d-grid gap-2 addReviews">
                    <button class="button-55" role="button" onClick={CheckUserConnected}>Add new Review</button>
                </div>


                <div>
                    <Modal show={show} onHide={handleClose} style={{ background: "rgba(0, 0, 0, 0.8)" }}>
                        <Modal.Header className='titleHeater'>
                            <Modal.Title ><h1>Here you can Add New Review :</h1></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={3}
                                        value={textReviews}
                                        onChange={(event) => setTextReviews(event.target.value)} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="success" onClick={addReviews}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <div className='space'></div>



                <div className='OurReviews'>

                    <Row xs={1} md={2} lg={3} className="g-4">
                        {reviews.sort((a, b) => b.Count_likes - a.Count_likes).map((record) => (



                            <div class="testimonial-box-container">

                                <div class="testimonial-box">

                                    <div class="box-top">

                                        <div class="profileReviews">


                                            <div class="nameInfo-userInfo">
                                                <span>Name : {record.FirstName}</span>

                                                <span>Login : @{record.User_Login}</span>
                                            </div>
                                        </div>

                                        <div class="reviews">
                                            <p>{record.DatePublished}</p>
                                        </div>
                                    </div>



                                    <div class="client-comment">
                                        {/* <h6>Opinion :</h6> */}

                                        <p>{record.textReviews}</p>
                                    </div>


                                    <div className='clickLike'>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Like (:</Tooltip>}>

                                            <button class="button-30" role="button"
                                                onClick={() => addReviewsLike(record.FirstName, record.Serial_code)}>
                                                <i class="far fa-thumbs-up"></i> {record.Count_likes}
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

export default service;