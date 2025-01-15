import React, { useState } from "react";
import Cookies from 'js-cookie';
import { Form, Modal , Button , Spinner } from "react-bootstrap";
import "../../../css/service.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import RobotBox from "../../ReCAPTCHA/RobotBox.jsx";
import { useForm } from "react-hook-form";
import { userAddNewReview } from "../../../customHook/customQueryHook.js";



const UserAddNewReview = ({ closePopUp }) => {


  const { register, handleSubmit } = useForm();

  // react query
  const { mutate, isLoading: isRegister } = userAddNewReview(closePopUp);

  let storedTheme = localStorage.getItem("theme");

  // check box if user not robot
  const [capVal, setCapVal] = useState(false);



  const onSubmitAddNewReview = (data) => {

    // let userData = JSON.parse(sessionStorage.getItem("user"));
    let userData = Cookies.get('user-data') ? JSON.parse(Cookies.get('user-data')) : null;
  
    let d = new Date();

    let user = {
      textReviews: data.textReviews,
      DatePublished: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
      Publish_by: userData._id,
      FirstName: userData.FirstName,
      User_Login: userData.User_Login,
      IsActive: "1",
      Count_likes: [],
    };

    mutate(user);
  };


  const handleError = (errors) => {
    console.log(errors);
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
            Add New Review <i class="bi bi-chat-dots"></i>
          </h1>
        </div>

        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmitAddNewReview, handleError)}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              style={{ paddingBottom: "5%" }}
            >
              <Form.Control
                as="textarea"
                rows={3}
                autoFocus
                placeholder="input your Review"
                {...register("textReviews", {
                  required: true,
                })}
              />
            </Form.Group>

            {/* check robot box if user don't robot */}
            <RobotBox activeRobotBox={() => setCapVal(true)} />

            <div className="buttonAddNewReviewOrCLose">
              {!isRegister ? (
                <Button
                  style={!capVal ? { cursor: "not-allowed" } : {}}
                  variant="success"
                  disabled={!capVal || isRegister}
                  type="submit"
                >
                  Add a Review
                </Button>
              ) : (
                <Button variant="success">
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </Button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </div>
    </>
  );
};


export default UserAddNewReview;