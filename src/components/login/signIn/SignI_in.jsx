import React from "react";
import { Modal, Form } from "react-bootstrap";
import "../login.css";
import ForgetPassword from "../userForgetPassword/ForgetPassword";
import ShowModelFormConnect from "./ShowModelFormConnect";
import { ShowModelPopUp } from "../../../customHook/showPopUp";
import LazyLoadImg from "../../tools/lazyLoad/LazyLoadImg";



const Sign_in = ({ hideSignIn }) => {


  let storedTheme = localStorage.getItem("theme");

  // show popup Forget Password custom Hook
  const { show, handleShow } = ShowModelPopUp();


  return (
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
        <div className="imgLogin">
          <LazyLoadImg
            className="imgLogin"
              type=""
              img="https://i.postimg.cc/NGVgVYXH/qqq.gif"
              width=""
              height=""
              alt="login"
            />
        </div>

        {/* show form sign in and connect demo & forget password */}
        <ShowModelFormConnect
          activeForgetPassword={handleShow}
          hideSignIn={hideSignIn}
        />
      </div>

      {/* show pop up forget password */}
      <Modal show={show} style={{ background: "rgba(0, 0, 0, 0.80)" }}>
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
  );
};


export default Sign_in;