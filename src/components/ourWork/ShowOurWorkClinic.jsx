import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";


const ShowOurWorkClinic = ({ infoOurWork }) => {

  const { path, title, text } = infoOurWork;

  let storedTheme = localStorage.getItem("theme");
  const [showMore, setShowMore] = useState(false);


  return (
    <Col>
      <Card
        className="aaa"
        style={
          storedTheme === "light"
            ? {
                marginTop: "10px",
                background: "#424242",
                borderBottomRightRadius: "25px",
                borderBottomLeftRadius: "25px",
                marginTop: "12%",
              }
            : storedTheme === "dark"
            ? {
                borderBottomRightRadius: "25px",
                borderBottomLeftRadius: "25px",
                marginTop: "12%",
              }
            : ""
        }
      >
        <Card.Img variant="top" src={path} />

        <Card.Body
          style={
            storedTheme === "light"
              ? { color: "#ffffffab" }
              : storedTheme === "dark"
              ? {}
              : ""
          }
        >
          <Card.Title>
            <h3>{title}</h3>
          </Card.Title>

          <Card.Text>
            {text.length < 100 ? (
              text
            ) : (
              <div className="readMore">
                {showMore ? text : `${text.substring(0, 60)}`}
                <b onClick={() => setShowMore(!showMore)}>
                  {showMore ? "Show less" : "Read more"}
                </b>
              </div>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};


export default ShowOurWorkClinic;