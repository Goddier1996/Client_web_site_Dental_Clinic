import React, { useState } from "react";
import { Form, Col, Row, Button, Spinner } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import RobotBox from "../ReCAPTCHA/RobotBox.jsx";
import {
  popErrorRegisterUser,
  checkInputValueEmail,
  popErrorEmailIncorrect,
  checkIfMailValid,
} from "./function/RegisterUser.js";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { newUserRegister } from "../../customHook/customQueryHook.js";



const UserRegister = () => {


  const history = useHistory();
  let storedTheme = localStorage.getItem("theme");

  // check box if user not robot
  const [capVal, setCapVal] = useState(false);

  const [loadingCheckMailValid, setLoadingCheckMailValid] = useState(false);


  let d = new Date();
  let DatePublished = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;


  const { register, handleSubmit } = useForm({
    defaultValues: {
      FirstName: "",
      User_Login: "",
      Birthday: DatePublished,
      Email: "",
      User_password: "",
      UserType_code: "1",
      ConfirmPassword: "",
      Day_date: null,
      Hour_day: null,
      Serial_codeHour: null,
      IsActive: "1",
      DateWhenAddUserTurn: null,
      DateUserTurn: null,
      sendEmailHaveTurn: null,
    },
  });

  // react query
  const { mutate, isLoading: isRegister } = newUserRegister(history);


  const onSubmitRegisterNewUser = async (data) => {
    // if password don't confirm show alert error
    if (data.User_password !== data.ConfirmPassword) {
      popErrorRegisterUser();
    }

    // check email input
    else if (!checkInputValueEmail(data.Email)) {
      popErrorEmailIncorrect();
    }

    // here register user , use query hook
    // and check if email is valid
    else {
      checkIfMailValid(mutate, data, setLoadingCheckMailValid);
    }
  };


  const handleError = (errors) => {
    console.log(errors);
  };


  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmitRegisterNewUser, handleError)}
        style={
          storedTheme === "light"
            ? { textAlign: "center", alignItems: "center", color: "white" }
            : storedTheme === "dark"
            ? { textAlign: "center", alignItems: "center", color: "#4b4b4b" }
            : ""
        }
      >
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Control
              style={
                storedTheme === "light"
                  ? { fontSize: "14px", textAlign: "center" }
                  : storedTheme === "dark"
                  ? {
                      background: "rgba(0, 0, 0, 0.1)",
                      fontSize: "14px",
                      textAlign: "center",
                    }
                  : ""
              }
              placeholder="Enter Login"
              name="User_Login"
              type="text"
              {...register("User_Login", {
                required: true,
              })}
            />
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Control
              style={
                storedTheme === "light"
                  ? { fontSize: "14px", textAlign: "center" }
                  : storedTheme === "dark"
                  ? {
                      background: "rgba(0, 0, 0, 0.1)",
                      fontSize: "14px",
                      textAlign: "center",
                    }
                  : ""
              }
              type="text"
              placeholder="Enter First Name"
              {...register("FirstName", {
                required: true,
              })}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md="12">
            <Form.Control
              style={
                storedTheme === "light"
                  ? { fontSize: "14px", textAlign: "center" }
                  : storedTheme === "dark"
                  ? {
                      background: "rgba(0, 0, 0, 0.1)",
                      fontSize: "14px",
                      textAlign: "center",
                    }
                  : ""
              }
              type="email"
              placeholder="Enter Email"
              {...register("Email", {
                required: true,
                pattern:
                  "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/",
              })}
            />
            <Form.Text
              style={{
                marginBottom: "10%",
                marginTop: "-10%",
                fontSize: "11px",
              }}
            >
              (Please enter a valid email)
            </Form.Text>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md="6">
            <Form.Control
              style={
                storedTheme === "light"
                  ? { fontSize: "14px", textAlign: "center" }
                  : storedTheme === "dark"
                  ? {
                      background: "rgba(0, 0, 0, 0.1)",
                      fontSize: "14px",
                      textAlign: "center",
                    }
                  : ""
              }
              type="password"
              placeholder="Enter Password"
              {...register("User_password", {
                required: "please input",
                minLength: {
                  value: 6,
                  required: true,
                },
              })}
            />
            <Form.Text
              style={{
                marginBottom: "10%",
                marginTop: "-10%",
                fontSize: "11px",
              }}
            >
              (password must be more 6 characters long)
            </Form.Text>
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Control
              style={
                storedTheme === "light"
                  ? { fontSize: "14px", textAlign: "center" }
                  : storedTheme === "dark"
                  ? {
                      background: "rgba(0, 0, 0, 0.1)",
                      fontSize: "14px",
                      textAlign: "center",
                    }
                  : ""
              }
              type="password"
              placeholder="Enter Confirm Password"
              {...register("ConfirmPassword", {
                required: "please input",
                minLength: {
                  value: 6,
                  required: true,
                },
              })}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md="12">
            <div className="titleBirthdayDate">
              <p>Enter Birthday Date :</p>
            </div>

            <Form.Control
              style={
                storedTheme === "light"
                  ? { fontSize: "14px", textAlign: "center" }
                  : storedTheme === "dark"
                  ? {
                      background: "rgba(0, 0, 0, 0.1)",
                      fontSize: "14px",
                      textAlign: "center",
                    }
                  : ""
              }
              type="date"
              {...register("Birthday", {
                required: true,
              })}
            />
          </Form.Group>
        </Row>

        {/* check box if user dont robot */}
        <RobotBox activeRobotBox={() => setCapVal(true)} />

        {!isRegister && !loadingCheckMailValid ? (
          <Button
            style={!capVal ? { cursor: "not-allowed" } : {}}
            variant="success"
            disabled={!capVal || isRegister || loadingCheckMailValid}
            type="submit"
          >
            Register
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
      </Form>
    </>
  );
};


export default UserRegister;