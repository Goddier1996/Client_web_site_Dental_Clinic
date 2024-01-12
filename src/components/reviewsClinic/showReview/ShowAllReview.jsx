import React from "react";
import CardReview from "./CardReview";
import { Row } from "react-bootstrap";


const ShowAllReview = ({ allReview }) => {

  return (
    <div className="modelsShowReview">
      <Row xs={1} md={2} lg={3} style={{ width: "100%" }}>
        {allReview
          // .sort((a, b) => b.Count_likes.length - a.Count_likes.length)
          .map((record) => (
            <div key={record._id}>
              <CardReview allReview={record} />
            </div>
          ))}
      </Row>
    </div>
  );
};


export default ShowAllReview;