import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap-icons/font/bootstrap-icons.css";
import RobotBox from "../ReCAPTCHA/RobotBox.jsx";
import Spinner from "react-bootstrap/Spinner";
import { checkValueInput } from "./function/RegisterUser.js";
import { useHistory } from "react-router-dom";



const UserRegister = () => {


  // input date Birthday , and show default date when input your date
  let d = new Date();
  let DatePublished = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  const [Birthday, setBirthday] = useState(DatePublished);

  // input value when register
  const [User_Login, setLogin] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");


  // check box if user not robot
  const [capVal, setCapVal] = useState(false);

  const [loadingRegister, setLoadingRegister] = useState(false);

  const history = useHistory();
  let storedTheme = localStorage.getItem("theme");

    
  const checkInputValueRegister = async () => {
    let userDataInput = {
      User_Login: User_Login,
      FirstName: FirstName,
      Email: Email,
      Password: Password,
      ConfirmPassword: ConfirmPassword,
    };

    checkValueInput(userDataInput, () => setLoadingRegister(true), history);
  };

    
  return (
    <>
      <Form
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
              value={User_Login}
              onChange={(event) => setLogin(event.target.value)}
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
              value={FirstName}
              onChange={(event) => setFirstName(event.target.value)}
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
              value={Email}
              onChange={(event) => setEmail(event.target.value)}
            />
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
              value={Password}
              onChange={(event) => setPassword(event.target.value)}
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
              type="password"
              placeholder="Enter Confirm Password"
              value={ConfirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
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
              value={Birthday}
              onChange={(event) => setBirthday(event.target.value)}
            />
          </Form.Group>
        </Row>

        {/* check box if user dont robot */}
        <RobotBox activeRobotBox={() => setCapVal(true)} />

        {!loadingRegister ? (
          <Button
            style={!capVal ? { cursor: "not-allowed" } : {}}
            variant="success"
            disabled={!capVal}
            onClick={checkInputValueRegister}
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