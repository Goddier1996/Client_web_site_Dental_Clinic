import React from "react";
import AddReviewLike from "../addLikeDesLike/AddReviewLike";
import { OverlayTrigger, Tooltip } from "react-bootstrap";


const CardReview = ({ allReview }) => {

  let storedTheme = localStorage.getItem("theme");

  return (
    <div className="testimonial-box-container">
      <div
        className={
          storedTheme === "light"
            ? "testimonial-box"
            : storedTheme === "dark"
            ? "testimonialDark-boxDark"
            : ""
        }>
        <div className="box-top">
          <div className="profileReviews">
            <div className="nameInfo-userInfo">
              <span>Name : {allReview.FirstName}</span>
              <span>Login : @{allReview.User_Login}</span>
            </div>
          </div>

          <div className="reviews">
            <p>{allReview.DatePublished}</p>
          </div>
        </div>

        <div className="client-comment">
          <p>{allReview.textReviews}</p>
        </div>

              
        {/* add Like Review */}

            <AddReviewLike
              FirstName={allReview.FirstName}
              id={allReview._id}
              CountLikes={allReview.Count_likes}
            />
      </div>
    </div>
  );
};


export default CardReview;