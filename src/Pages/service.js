import React, { useState, useEffect } from 'react'
import { Row, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import '../css/service.css'
import Swal from 'sweetalert2'
import { LoadReviews, LoadCountReviews } from '../Api/LoadDataFromApi'
import { AddNewReviews, AddNewLikeReviews } from '../Api/ConnectOrAddFromApi'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RateReviewIcon from '@mui/icons-material/RateReview';
import NotFoundPage from '../components/NotFoundPage'
import { useQueryDataLoadingRefetchAutoData, useQueryOnlyLoadingData } from "../customHook/customQueryHook"
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion as m } from "framer-motion/dist/framer-motion"



//here we show Reviews and like and add them
function Service() {


    const [showAddReviews, setShowAddReviews] = useState(false);
    const handleCloseAddReviews = () => setShowAddReviews(false);
    const handleShowAddReviews = () => setShowAddReviews(true);

    const [textReviews, setTextReviews] = useState('');

    let userData = JSON.parse(sessionStorage.getItem("user"));
    let storedTheme = localStorage.getItem("theme");

    const [pageNumberNow, setPageNumberNow] = useState(1);
    const [SizeAllPages, setSizeAllPages] = useState(0);


    // use custom hook , useQuery
    const { isLoading: LoadingReviews, data: showReviews, isError: ErrorReviews } =
        useQueryDataLoadingRefetchAutoData('reviews', pageNumberNow, LoadReviews, null);

    const { data: countReviews } =
        useQueryOnlyLoadingData('CountReviews', LoadCountReviews, null);




    const BackPageReviews = () => {

        setPageNumberNow((p) => {
            if (p === 1) {
                return p;
            }

            window.scrollTo(0, 0)

            return p - 1;
        })
    }



    const NextPageReviews = () => {

        setPageNumberNow((p) => {
            if (p === SizeAllPages) {
                return p;
            }

            window.scrollTo(0, 0)

            return p + 1;
        })
    }



    const MoveToEndPage = () => {
        setPageNumberNow((Math.round(countReviews / 4.2)) - 1);
    }



    const MoveToStartPage = () => {
        setPageNumberNow(1);
    }



    const CheckUserConnected = () => {

        if (userData == null) {

            Swal.fire({
                icon: 'warning',
                title: 'Login / Register',
                html: 'You need to log in or register, you should add a comment',
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


        if (userData != null) {
            handleShowAddReviews();
        }
    }



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
            handleCloseAddReviews()
            // window.location.reload(false);
        }
    }



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
        }

        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...Please connect and you can add like (:',
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




    // set count page we need to show Reviews
    useEffect(() => {

        let result = Math.round(countReviews / 4.2);

        if (showReviews) {
            setSizeAllPages(result - 1);
        }
    })




    return (

        <>
            {/* show Loading */}
            {(LoadingReviews) ?
                <div className='loadingReview'>
                    <img src="https://media3.giphy.com/media/lMl2tZmYHhrJHvY4rP/200w.gif?cid=82a1493bv5vympwzpd0gt9did8lb8r9vlei1poc0gx1gw4zx&rid=200w.gif&ct=s" />
                </div>
                :
                (ErrorReviews) ?
                    <>
                        <NotFoundPage />
                    </>
                    :
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        // initial={{ y: "100%" }}
                        // animate={{ y: "0%" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.75, ease: "easeOut" }}
                    >

                        <div className={(storedTheme === "light") ? "titleOurReviewDark" : (storedTheme === "dark") ? "titleOurReview" : ""}>
                            <br />
                            <h1>Reviews of our clinic :</h1>
                        </div>

                        <div className="d-grid gap-2 addReviews" >
                            <button className={(storedTheme === "light") ? "button-55Dark" : (storedTheme === "dark") ? "button-55" : ""}
                                role="button"
                                onClick={CheckUserConnected}>
                                Add new Review
                            </button>
                        </div>


                        <div>
                            <Modal show={showAddReviews} onHide={handleCloseAddReviews}>

                                <div className={(storedTheme === "light") ? "cardModelAddNewReviewDark" : (storedTheme === "dark") ? "cardModelAddNewReview" : ""}>

                                    <div className="closeModelAddReview">

                                        <Button style={(storedTheme === "light") ? { background: "#424242" } :
                                            (storedTheme === "dark") ? { background: "white" } : ""}
                                            variant="contained"
                                            onClick={handleCloseAddReviews} >

                                            <CloseIcon style={(storedTheme === "light") ? { fontSize: "20px", color: "white" } :
                                                (storedTheme === "dark") ? { fontSize: "20px", color: "black" } : ""}
                                                variant="contained"
                                                onClick={handleCloseAddReviews} />
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
                        <br />

                        <div className='modelsShowReview'>

                            <Row xs={1} md={2} lg={3} style={{ width: "100%" }}>
                                {showReviews.sort((a, b) => b.Count_likes.length - a.Count_likes.length).map((record) => (

                                    <div className="testimonial-box-container">

                                        <div key={record._id} className="testimonial-box">

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


                        {/* Button's move next page or back */}
                        <div className='nextOrPrev'>
                            <div className='prevNextButton'>

                                <Button variant="contained" style={{ color: "white", height: "90%", fontSize: "11px" }}
                                    title='Move to Start Page'
                                    onClick={MoveToStartPage} disabled={pageNumberNow === 1}>
                                    Start Page
                                </Button>


                                <Button variant="contained" color="success" style={{ color: "white", height: "90%" }}
                                    title='Previous Page'
                                    onClick={BackPageReviews} disabled={pageNumberNow === 1}>
                                    <ArrowBackIosNewIcon style={{ fontSize: "14px" }} />
                                </Button>

                                <Button variant="contained" color="success" style={{ color: "white", height: "90%" }}
                                    title='Next Page'
                                    onClick={NextPageReviews} disabled={pageNumberNow === SizeAllPages}>
                                    <ArrowForwardIosIcon style={{ fontSize: "14px" }} />
                                </Button>


                                <Button variant="contained" style={{ color: "white", height: "90%", fontSize: "11px" }}
                                    title="Move to End Page"
                                    onClick={MoveToEndPage} disabled={pageNumberNow === SizeAllPages}>
                                    End Page
                                </Button>

                            </div>
                        </div>

                    </m.div>
            }
        </>
    )

}

export default Service;