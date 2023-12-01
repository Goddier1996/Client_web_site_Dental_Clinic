import React, { useState, useEffect } from 'react'
import { Row, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import '../css/service.css'
import Swal from 'sweetalert2'
import { LoadReviews, LoadCountReviews } from '../Api/LoadDataFromApi'
import NotFoundPage from '../components/tools/NotFoundPage'
import { useQueryDataLoadingRefetchAutoData, useQueryOnlyLoadingData } from "../customHook/customQueryHook"
import { motion as m } from "framer-motion/dist/framer-motion"
import Pagination from '@mui/material/Pagination';
import UserAddNewReview from '../components/reviewsClinic/UserAddNewReview'
import AddReviewLike from '../components/reviewsClinic/AddReviewLike'



//here we show Reviews and like and add them
function Service() {


    const [showAddReviews, setShowAddReviews] = useState(false);
    const handleCloseAddReviews = () => setShowAddReviews(false);
    const handleShowAddReviews = () => setShowAddReviews(true);


    let userData = JSON.parse(sessionStorage.getItem("user"));
    let storedTheme = localStorage.getItem("theme");

    const [pageNumberNow, setPageNumberNow] = useState(1);
    const [SizeAllPages, setSizeAllPages] = useState(5);


    // use custom hook , useQuery
    const { isLoading: LoadingReviews, data: showReviews, isError: ErrorReviews } =
        useQueryDataLoadingRefetchAutoData('reviews', pageNumberNow, LoadReviews, null);

    const { data: countReviews } =
        useQueryOnlyLoadingData('CountReviews', LoadCountReviews, null);




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



    // set count page we need to show Reviews
    useEffect(() => {

        let result = Math.round(countReviews / 4.2);

        setSizeAllPages(result - 1);
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
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.75, ease: "easeOut" }}
                    >

                        <div className={(storedTheme === "light") ? "titleOurReviewDark" : (storedTheme === "dark") ? "titleOurReview" : ""}>
                            <h1>Reviews of our clinic :</h1>
                        </div>

                        <div className="d-grid gap-2 addReviews" >
                            <button className={(storedTheme === "light") ? "button-55Dark" : (storedTheme === "dark") ? "button-55" : ""}
                                role="button"
                                onClick={CheckUserConnected}>
                                Add new Review
                            </button>
                        </div>


                        {/* here model pop up user add new review */}
                        <Modal show={showAddReviews} onHide={handleCloseAddReviews}>
                            <UserAddNewReview closePopUp={handleCloseAddReviews} />
                        </Modal>



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


                                            {/* add Like Review */}
                                            <div className='clickLike'>
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Like ❤️</Tooltip>}>

                                                    <AddReviewLike FirstName={record.FirstName} id={record._id} CountLikes={record.Count_likes} />

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

                                <Pagination
                                    sx={(storedTheme === "light") ? { button: { color: '#ffffff' } } : (storedTheme === "dark") ? "" : ""}
                                    count={SizeAllPages}
                                    page={pageNumberNow}

                                    onChange={(event, value) => {
                                        setPageNumberNow(value)
                                        { (pageNumberNow != value) ? window.scrollTo(0, 0) : console.log() }
                                    }}

                                    showFirstButton
                                    showLastButton
                                    size="large"
                                    color='success'
                                />


                                {/* my first UI next page */}
                                {/* {(pageNumberNow === 1) ?
                                    <>
                                        <Button variant="contained" color="success" style={{ color: "white", textTransform: "capitalize" }}
                                            title='Next Page'
                                            onClick={NextPageReviews} disabled={pageNumberNow === SizeAllPages}>
                                            Next Page
                                        </Button>

                                        <Button variant="contained" style={{ color: "white", textTransform: "capitalize" }}
                                            title="Move to End Page"
                                            onClick={MoveToEndPage} disabled={pageNumberNow === SizeAllPages}>
                                            Last Page
                                        </Button>
                                    </>

                                    :
                                    (pageNumberNow === SizeAllPages) ?
                                        <>
                                            <Button variant="contained" style={{ color: "white", textTransform: "capitalize" }}
                                                title='Move to Start Page'
                                                onClick={MoveToStartPage} disabled={pageNumberNow === 1}>
                                                First Page
                                            </Button>

                                            <Button variant="contained" color="success" style={{ color: "white", textTransform: "capitalize" }}
                                                title='Previous Page'
                                                onClick={BackPageReviews} disabled={pageNumberNow === 1}>
                                                Previous Page
                                            </Button>
                                        </>

                                        :
                                        <>
                                            <Button variant="contained" style={{ color: "white", textTransform: "capitalize" }}
                                                title='Move to First Page'
                                                onClick={MoveToStartPage} disabled={pageNumberNow === 1}>
                                                <ArrowBackIosNewIcon style={{ fontSize: "14px" }} /><ArrowBackIosNewIcon style={{ fontSize: "14px" }} />
                                            </Button>

                                            <Button variant="contained" color="success" style={{ color: "white" }}
                                                title='Previous Page'
                                                onClick={BackPageReviews} disabled={pageNumberNow === 1}>
                                                <ArrowBackIosNewIcon style={{ fontSize: "14px" }} />
                                            </Button>

                                            <Button variant="contained" color="success" style={{ color: "white" }}
                                                title='Next Page'
                                                onClick={NextPageReviews} disabled={pageNumberNow === SizeAllPages}>
                                                <ArrowForwardIosIcon style={{ fontSize: "14px" }} />
                                            </Button>

                                            <Button variant="contained" style={{ color: "white", textTransform: "capitalize" }}
                                                title="Move to Last Page"
                                                onClick={MoveToEndPage} disabled={pageNumberNow === SizeAllPages}>
                                                <ArrowForwardIosIcon style={{ fontSize: "14px" }} /><ArrowForwardIosIcon style={{ fontSize: "14px" }} />
                                            </Button>
                                        </>
                                } */}

                            </div>
                        </div>

                    </m.div>
            }
        </>
    )
}

export default Service;