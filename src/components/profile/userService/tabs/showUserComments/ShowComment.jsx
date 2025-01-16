import React from "react";
import { Button, Spinner } from "react-bootstrap";
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
          {!isDeleting ? (
            <Button
              style={isDeleting ? { cursor: "not-allowed" } : {}}
              variant="danger"
              disabled={isDeleting}
              onClick={() => mutate(dataReview._id)}
            >
              <i className="bi bi-trash"></i>
            </Button>
          ) : (
              <Button
                disabled={isDeleting}
                variant="danger">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </Button>
          )}
        </td>
      </tr>
    </>
  );
};


export default ShowComment;