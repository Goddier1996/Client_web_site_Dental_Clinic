import React, { useState, useEffect } from "react";
import { Row, Modal } from "react-bootstrap";
import "../css/service.css";
import { LoadCountReviews } from "../Api/LoadDataFromApi";
import NotFoundPage from "../components/tools/pageNotFound/NotFoundPage.jsx";
import {
  useQueryLoadingAllData,
  useQueryLoadingAllReviewClinic,
} from "../customHook/customQueryHook";
import { motion as m } from "framer-motion/dist/framer-motion";
import Pagination from "@mui/material/Pagination";
import UserAddNewReview from "../components/reviewsClinic/addNewReview/UserAddNewReview.jsx";
import ShowAllReview from "../components/reviewsClinic/showReview/ShowAllReview.jsx";
import LoadingReview from "../components/loading/LoadingReview.jsx";
import ButtonAddNewReview from "../components/reviewsClinic/addNewReview/ButtonAddNewReview.jsx";
import { checkUserConnectedForAddReview } from "../components/reviewsClinic/function/AddReviewAndLike.js";



//here we show Reviews and like and add them
function Service() {


  // show popup add new review
  const [showAddReviews, setShowAddReviews] = useState(false);
  const handleCloseAddReviews = () => setShowAddReviews(false);
  const handleShowAddReviews = () => setShowAddReviews(true);

  let storedTheme = localStorage.getItem("theme");

  const [pageNumberNow, setPageNumberNow] = useState(1);
  const [SizeAllPages, setSizeAllPages] = useState();



  // use custom hook , useQuery
  const {
    isLoading: LoadingReviews,
    data: showReviews,
    isError: ErrorReviews,
  } = useQueryLoadingAllReviewClinic("reviews", pageNumberNow);

  const { data: countReviews } = useQueryLoadingAllData(
    "CountReviews",
    LoadCountReviews
  );



  // set count page we need to show Reviews
  useEffect(() => {
    let result = Math.round(countReviews / 4.2);

    setSizeAllPages(result - 1);
  });



  return (
    <>
      {/* show Loading */}
      {LoadingReviews ? (
        <LoadingReview />
      ) : ErrorReviews ? (
        <NotFoundPage />
      ) : (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div
            className={
              storedTheme === "light"
                ? "titleOurReviewDark"
                : storedTheme === "dark"
                ? "titleOurReview"
                : ""
            }
          >
            <h1>Reviews of our clinic :</h1>
          </div>

          {/* add new review */}
          <ButtonAddNewReview
            CheckUserConnected={() =>
              checkUserConnectedForAddReview(() => handleShowAddReviews())
            }
          />

          {/* here model pop up user add new review */}
          <Modal show={showAddReviews} onHide={handleCloseAddReviews}>
            <UserAddNewReview closePopUp={handleCloseAddReviews} />
          </Modal>

          <div className="space"></div>
          <br />

          {/* show all review this clinic */}
          <div className="modelsShowReview">
            <Row xs={1} md={2} lg={3} style={{ width: "100%" }}>
              {showReviews
                .sort((a, b) => b.Count_likes.length - a.Count_likes.length)
                .map((record) => (
                  <div key={record._id}>
                    <ShowAllReview allReview={record} />
                  </div>
                ))}
            </Row>
          </div>

          {/* Button's move next page or back */}
          <div className="nextOrPrev">
            <div className="prevNextButton">
              <Pagination
                sx={
                  storedTheme === "light"
                    ? { button: { color: "#ffffff" } }
                    : storedTheme === "dark"
                    ? ""
                    : ""
                }
                count={SizeAllPages || 0}
                page={pageNumberNow}
                onChange={(event, value) => {
                  setPageNumberNow(value);
                  {
                    pageNumberNow != value
                      ? window.scrollTo(0, 0)
                      : console.log();
                  }
                }}
                showFirstButton
                showLastButton
                size="large"
                color="success"
              />
            </div>
          </div>
        </m.div>
      )}
    </>
  );
}


export default Service;