import React from "react";
import { Table } from "react-bootstrap";
import ShowComment from "./ShowComment";


const MyComments = ({ myReview }) => {


  let storedTheme = localStorage.getItem("theme");
  let MyReviews = 1;

    
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

            <ShowComment dataReview={Review} countReview={MyReviews++} />

          </tbody>
        ))}
      </Table>
    </>
  );
};


export default MyComments;