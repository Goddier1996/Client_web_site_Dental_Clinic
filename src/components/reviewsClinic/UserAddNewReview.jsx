import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import "../../css/service.css";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Button from "react-bootstrap/Button";
import "bootstrap-icons/font/bootstrap-icons.css";
import RobotBox from "../ReCAPTCHA/RobotBox.jsx";
import { userAddReview } from "./function/AddReviewAndLike.js";


const UserAddNewReview = ({ closePopUp }) => {


  const [textReviews, setTextReviews] = useState("");

  let storedTheme = localStorage.getItem("theme");


  // check box if user not robot
  const [capVal, setCapVal] = useState(false);


  const addReviews = async () => {

    userAddReview(
      textReviews,
      closePopUp,
      () => setTextReviews(),
      () => setCapVal(false)
    );
  };

  
  return (
    <>
      <div
        className={
          storedTheme === "light"
            ? "cardModelAddNewReviewDark"
            : storedTheme === "dark"
            ? "cardModelAddNewReview"
            : ""
        }
      >
        <div className="closeModelAddReview">
          <Button
            style={
              storedTheme === "light"
                ? { background: "#424242" }
                : storedTheme === "dark"
                ? { background: "white" }
                : ""
            }
            variant=""
            onClick={() => closePopUp()}
          >
            <i
              style={
                storedTheme === "light"
                  ? { fontSize: "20px", color: "white" }
                  : storedTheme === "dark"
                  ? { fontSize: "20px", color: "black" }
                  : ""
              }
              class="bi bi-x-lg"
            ></i>
          </Button>
        </div>

        <div className="titleHeater">
          <h1
            style={
              storedTheme === "light"
                ? { color: "white" }
                : storedTheme === "dark"
                ? { color: "#00000094" }
                : ""
            }
          >
            Add New Review <RateReviewIcon style={{ fontSize: "30px" }} />
          </h1>
        </div>

        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                value={textReviews}
                onChange={(event) => setTextReviews(event.target.value)}
                autoFocus
                placeholder="input your Review"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        {/* check robot box if user don't robot */}
        <RobotBox activeRobotBox={() => setCapVal(true)} />

        <div className="buttonAddNewReviewOrCLose">
          <Button
            style={!capVal ? { cursor: "not-allowed" } : {}}
            disabled={!capVal}
            variant="success"
            onClick={addReviews}
          >
            Add a Review
          </Button>
        </div>
      </div>
    </>
  );
};


export default UserAddNewReview;