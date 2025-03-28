import React from "react";
import "../../../css/service.css";
import { userLikeOrDesLikeReview } from "../../../customHook/customQueryHook";
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
    <button
      className="BtnLikeDes"
      type="submit"
      disabled={isLikeOrDisLike}
      onClick={() => addReviewsLike(FirstName, id)}
    >
      <span className="leftContainer">
        <svg
          fill="white"
          viewBox="0 0 512 512"
          height="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
        </svg>
      </span>
      <span className="likeCount">
        {!isLikeOrDisLike ? (
          <>{CountLikes.length}</>
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
      </span>
    </button>
  );
};


export default AddReviewLike;