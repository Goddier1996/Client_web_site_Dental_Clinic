import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap-icons/font/bootstrap-icons.css";
import { deleteIdReviewUser } from "../../../../../customHook/customQueryHook";


const ShowComment = ({ dataReview, countReview }) => {


  // react query
  const { isLoading: isDeleting, mutate } = deleteIdReviewUser();


  return (
    <>
      <tr>
        <td style={{ textAlign: "center", fontSize: "14px" }}>{countReview}</td>
        <td style={{ textAlign: "center", fontSize: "12px" }}>
          {dataReview.DatePublished}
        </td>
        <td style={{ textAlign: "center", fontSize: "14px" }}>
          {dataReview.textReviews}
        </td>
        <td style={{ textAlign: "center", fontSize: "14px" }}>
          <Button
            variant="danger"
            disabled={isDeleting}
            onClick={() => mutate(dataReview._id)}
          >
            <i className="bi bi-trash"></i>
          </Button>
        </td>
      </tr>
    </>
  );
};


export default ShowComment;