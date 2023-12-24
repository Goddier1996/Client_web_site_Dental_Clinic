import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import "../login.css";
import ForgetPassword from "../userForgetPassword/ForgetPassword";
import ShowModelFormConnect from "./ShowModelFormConnect";



function Sign_in({ hideSignIn }) {


  let storedTheme = localStorage.getItem("theme");

  // show pop up
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const handleShowForgetPassword = () => setShowForgetPassword(true);


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
          }>
          <div className="header-form">
            <h4 className="text-primary text-center">
              <img
                className="d-block w-100"
                src="https://i.postimg.cc/NGVgVYXH/qqq.gif"
              />
            </h4>
            <div className="image"></div>
          </div>

          {/* show form sign in and connect demo & forget password */}
          <ShowModelFormConnect
            activeForgetPassword={handleShowForgetPassword}
            hideSignIn={hideSignIn}
          />

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
              {/* active forget password component */}
              <ForgetPassword />
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}


export default Sign_in;