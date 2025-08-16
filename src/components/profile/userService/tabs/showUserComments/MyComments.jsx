import React from "react";
import { Table } from "react-bootstrap";
import ShowComment from "./ShowComment";
import { compareDates } from "../../../doctorService/function/DoctorFunctionService";
import ShowMessageToUser from "../../../tools/ShowMessageToUserAndDoctor";
import LazyLoadImg from "../../../../tools/lazyLoad/LazyLoadImg";


const MyComments = ({ myReview }) => {


  let storedTheme = localStorage.getItem("theme");
  let MyReviews = 1;

  // Sorting the data by date before rendering
  const sortedData = [...myReview].sort(compareDates);


  return (
    <>
      <div className="medicalFilesUser">
        <LazyLoadImg
          type=""
          img="https://i.postimg.cc/bYxQg1Ys/Pngtree-customer-good-review-8772784.png"
          width=""
          height="110"
          alt="MyComments"
        />
      </div>
      {myReview.length ? (
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
              <th style={{ width: "18%", textAlign: "center" }}>
                Date Publish
              </th>
              <th style={{ textAlign: "center" }}>Review</th>
              <th style={{ textAlign: "center" }}>Delete</th>
            </tr>
          </thead>

          {sortedData.map((Review) => (
            <tbody key={Review._id}>
              <ShowComment dataReview={Review} countReview={MyReviews++} />
            </tbody>
          ))}
        </Table>
      ) : (
        <ShowMessageToUser
          forHowSeeThisMessage={"Message for User"}
          whichMessageShow={"Hi User you don't have any comments."}
        />
      )}
    </>
  );
};


export default MyComments;