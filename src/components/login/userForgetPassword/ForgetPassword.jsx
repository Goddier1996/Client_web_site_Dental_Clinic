import React, { useState } from "react";
import { Modal, Form , Button } from "react-bootstrap";
import "./forgetPassword.css";
import {
  closePopUpForgetPassword,
  searchEmailFromDataBase,
} from "../function/UserForgetPassword";
import InputNewData from "./InputNewData";
import { ShowModelPopUp } from "../../../customHook/showPopUp";



//here component forget Password use in sign In component
function ForgetPassword() {


   // show popup New Password custom Hook
  const { show, handleShow } = ShowModelPopUp();

  const [Email, setEmail] = useState("");

  
  const checkEmailInput = () => {
    searchEmailFromDataBase(Email, handleShow);
  };

    
  return (
    <>
      <div className="enterEmail">
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="enter your Email"
            value={Email}
            onChange={(event) => setEmail(event.target.value)}
            autoFocus
          />

          <div className="startChangePassword">
            <Button variant="success" onClick={checkEmailInput}>
              Ok
            </Button>

            <Button variant="danger" onClick={closePopUpForgetPassword}>
              Close
            </Button>
          </div>
        </Form.Group>
      </div>

          
      {/* here show popup, input new value */}
      <div className="inputChangePasswort">
        <Modal
          show={show}
          style={{ background: "rgba(0, 0, 0, 0.9)" }}
        > 
          <InputNewData />  
        </Modal>
      </div>
    </>
  );
}


export default ForgetPassword;