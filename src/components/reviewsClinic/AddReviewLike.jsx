import React from "react";
import "../../css/service.css";
import { userLikeOrDesLikeReview } from "../../customHook/customQueryHook";
import Spinner from "react-bootstrap/Spinner";


const AddReviewLike = ({ FirstName, id, CountLikes }) => {


  // react query
  const { mutate, isLoading: isLikeOrDisLike } = userLikeOrDesLikeReview();


  // check in this func  , if user have like in this review (remove),if don't have(add)
  const addReviewsLike = (likeReview, Serial_code) => {

    let dataLike = {
      likeReview: likeReview,
      Serial_code: Serial_code,
    };

    // use query hook here send data info like or des like
    mutate(dataLike);
  };


  return (
    <>
      <button
        className="button-30"
        role="button"
        type="submit"
        disabled={isLikeOrDisLike}
        onClick={() => addReviewsLike(FirstName, id)}
      >
        {!isLikeOrDisLike ? (
          <>
            <i className="far fa-thumbs-up"></i>
            {CountLikes.length}
          </>
        ) : (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            variant="success"
          />
        )}
      </button>
    </>
  );
};


export default AddReviewLike;