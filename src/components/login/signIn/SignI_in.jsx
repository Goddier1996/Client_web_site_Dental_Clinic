import React from "react";
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
      <ForgetPassword showModelForgetPassword={show} />
    </div>
  );
};


export default Sign_in;