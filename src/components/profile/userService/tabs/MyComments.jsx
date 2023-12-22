import React from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap-icons/font/bootstrap-icons.css";
import { userDeleteReview } from "../function/UserProfileFunction";



const MyComments = ({ myReview }) => {


  let storedTheme = localStorage.getItem("theme");
  let MyReviews = 1;

    
  const DeleteReviewUser = (Id) => {
    userDeleteReview(Id);
  };

    
  return (
    <>
      <Table
        striped
        bordered
        hover
        size="sm"
        variant={
          storedTheme === "light" ? "dark" : storedTheme === "dark" ? "" : ""
        }
      >
        <thead>
          <tr>
            <th style={{ width: "1%", textAlign: "center" }}>#</th>
            <th style={{ width: "18%", textAlign: "center" }}>Date Publish</th>
            <th style={{ textAlign: "center" }}>Review</th>
            <th style={{ textAlign: "center" }}>Delete</th>
          </tr>
        </thead>

        {myReview.map((Review) => (
          <tbody key={Review._id}>
            <tr>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                {MyReviews++}
              </td>
              <td style={{ textAlign: "center", fontSize: "12px" }}>
                {Review.DatePublished}
              </td>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                {Review.textReviews}
              </td>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                <Button
                  variant="danger"
                  onClick={() => DeleteReviewUser(Review._id)}
                >
                  <i class="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </>
  );
};


export default MyComments;