import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import "./login.css";
import ForgetPassword from "./userForgetPassword/ForgetPassword";
import Button from "react-bootstrap/Button";
import "bootstrap-icons/font/bootstrap-icons.css";
import Spinner from "react-bootstrap/Spinner";
import {
  AdminInfoVideo,
  connectDemoUser,
  connectDemoDoctor,
  loginUser,
  CheckValueInput,
} from "./function/SignInUser";



function Sign_in({ hideSignIn }) {


  // show pop up
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const handleShowForgetPassword = () => setShowForgetPassword(true);

  const [Login, setLogin] = useState("");
  const [Password, setPassword] = useState("");

  const [loadingLogin, setLoadingLogin] = useState(false);

  let storedTheme = localStorage.getItem("theme");


  const CheckValueSignIn = () => {

    CheckValueInput(Login, Password, signInUser);
  };


  const signInUser = async () => {

    let user = {
      User_Login: Login,
      User_password: Password,
    };

    setLoadingLogin(true);

    await loginUser(user, () => setLoadingLogin(false));
  };


  const signInDemoUser = () => {

    setLoadingLogin(true);
    connectDemoUser();
  };


  const signInDemoDoctor = () => {

    setLoadingLogin(true);
    connectDemoDoctor();
  };


  return (
    <>
      <div className="modelLogin">
        <div
          className={
            storedTheme === "light"
              ? "form-boxDark"
              : storedTheme === "dark"
              ? "form-box"
              : ""
          }
        >
          <div className="header-form">
            <h4 className="text-primary text-center">
              <img
                className="d-block w-100"
                src="https://i.postimg.cc/NGVgVYXH/qqq.gif"
              />
            </h4>
            <div className="image"></div>
          </div>
          <div className="body-form">
            <form>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Login"
                  value={Login}
                  onChange={(event) => setLogin(event.target.value)}
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={Password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div className="loginInOrCloseButtom">
                {!loadingLogin ? (
                  <Button variant="primary" onClick={CheckValueSignIn}>
                    Login
                  </Button>
                ) : (
                  <Button variant="primary">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </Button>
                )}

                  <Button disabled={loadingLogin} variant="secondary" onClick={!loadingLogin? hideSignIn:null}>
                    Close
                  </Button>
              </div>

              <div
                className={
                  storedTheme == "light"
                    ? "messageDark"
                    : storedTheme == "dark"
                    ? "message"
                    : ""
                }
              >
                <p
                  className={loadingLogin ? "isDisabled" : ""}
                  onClick={!loadingLogin ? handleShowForgetPassword : null}
                >
                  Forgot your password
                </p>
              </div>

              <div
                className={
                  storedTheme == "light"
                    ? "borderSpaceDark"
                    : storedTheme == "dark"
                    ? "borderSpace"
                    : ""
                }
              ></div>

              <div
                className={
                  storedTheme == "light"
                    ? "DemoUserAndDoctorDark"
                    : storedTheme == "dark"
                    ? "DemoUserAndDoctor"
                    : ""
                }
              >
                <p>
                  Connect Demo
                  <a
                    className={loadingLogin ? "isDisabled" : ""}
                    onClick={!loadingLogin ? signInDemoUser : null}
                  >
                    {" "}
                    User
                  </a>{" "}
                  or
                  <a
                    className={loadingLogin ? "isDisabled" : ""}
                    onClick={!loadingLogin ? signInDemoDoctor : null}
                  >
                    {" "}
                    Doctor
                  </a>
                </p>
              </div>

              <div
                className={
                  storedTheme == "light"
                    ? "infoVideoAAdminDark"
                    : storedTheme == "dark"
                    ? "infoVideoAAdmin"
                    : ""
                }
              >
                <a onClick={AdminInfoVideo}>Click See What Admin can to do !</a>
              </div>

              {/* show pop up forget password */}
              <Modal
                show={showForgetPassword}
                style={{ background: "rgba(0, 0, 0, 0.80)" }}
              >
                <Modal.Header className="titleHeater">
                  <Modal.Title>
                    <h1>You forget a Password ? Let's create new :)</h1>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <ForgetPassword />
                  </Form>
                </Modal.Body>
              </Modal>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}


export default Sign_in;