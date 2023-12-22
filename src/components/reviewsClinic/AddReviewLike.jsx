import React from "react";
import "../../css/service.css";
import { userAddReviewsLike } from "./function/AddReviewAndLike";


const AddReviewLike = ({ FirstName, id, CountLikes }) => {


  // check in this func  , if user have like in this review (remove),if don't have(add)
  const addReviewsLike = async (likeReview, Serial_code) => {
    
    let dataLike = {
      likeReview: likeReview,
      Serial_code: Serial_code,
    };

    userAddReviewsLike(dataLike);
  };

    
  return (
    <>
      <button
        className="button-30"
        role="button"
        onClick={() => addReviewsLike(FirstName, id)}
      >
        <i className="far fa-thumbs-up"></i>
        {CountLikes.length}
      </button>
    </>
  );
};


export default AddReviewLike;