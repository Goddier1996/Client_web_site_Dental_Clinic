import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "../css/service.css";
import { LoadCountReviews } from "../Api/LoadDataFromApi";
import NotFoundPage from "../components/tools/pageNotFound/NotFoundPage.jsx";
import {
  useQueryLoadingAllData,
  useQueryLoadingAllReviewClinic,
} from "../customHook/customQueryHook";
import { motion as m } from "framer-motion/dist/framer-motion";
import { Pagination } from "@mui/material";
import UserAddNewReview from "../components/reviewsClinic/addNewReview/UserAddNewReview.jsx";
import ShowAllReview from "../components/reviewsClinic/showReview/ShowAllReview.jsx";
import LoadingReview from "../components/loading/LoadingReview.jsx";
import ButtonAddNewReview from "../components/reviewsClinic/addNewReview/ButtonAddNewReview.jsx";
import { checkUserConnectedForAddReview } from "../components/reviewsClinic/function/AddReviewAndLike.js";
import SelectOptionSortReview from "../components/reviewsClinic/showReview/selectOptionToSortReview/SelectOptionSortReview.jsx";
import { ShowModelPopUp } from "../customHook/showPopUp.js";
import MainTitleReviews from "../components/reviewsClinic/MainTitleReviews.jsx";



//here we show Reviews and like and add them
function Service() {


  // show popup add new review custom Hook
  const { show, handleClose, handleShow } = ShowModelPopUp();

  let storedTheme = localStorage.getItem("theme");

  const [pageNumberNow, setPageNumberNow] = useState(1);
  const [SizeAllPages, setSizeAllPages] = useState();

  const [sortReview, setSortReview] = useState("Select");


  // use custom hook , useQuery
  const {
    isLoading: LoadingReviews,
    data: showReviews,
    isError: ErrorReviews,
  } = useQueryLoadingAllReviewClinic("reviews", pageNumberNow, sortReview);


  const { data: countReviews } = useQueryLoadingAllData(
    "CountReviews",
    LoadCountReviews
  );


  const onSelectionOptionsChange = (e) => {
    setSortReview(e.target.value);
  };


  // set count page we need to show Reviews
  useEffect(() => {
    let result = Math.round(countReviews / 4.2);
    setSizeAllPages(result - 1);
  });



  return (
    <>
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
              
         <MainTitleReviews />
          <br/>
          {/* add new review */}
          <ButtonAddNewReview
            CheckUserConnected={() =>
              checkUserConnectedForAddReview(() => handleShow())
            }
          />

          {/* here model pop up user add new review */}
          <Modal show={show} onHide={handleClose}>
            <UserAddNewReview closePopUp={handleClose} />
          </Modal>

          <div className="space"></div>

          {/* here select option sort Review this clinic */}
          <SelectOptionSortReview
            onSelectionChange={onSelectionOptionsChange}
            sortReview={sortReview}
          />
   
              
          {/* show all review this clinic */}
          <ShowAllReview allReview={showReviews} />

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