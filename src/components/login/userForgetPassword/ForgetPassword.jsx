import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import "./forgetPassword.css";
import Button from "react-bootstrap/Button";
import {
  closePopUpForgetPassword,
  searchEmailFromDataBase,
} from "../function/UserForgetPassword";
import InputNewData from "./InputNewData";



//here component forget Password use in sign In component
function ForgetPassword() {


  const [showNewNewPassword, setShowNewPassword] = useState(false);
  const handleShowNewPassword = () => setShowNewPassword(true);

  const [Email, setEmail] = useState("");

    
  const checkEmailInput = () => {
    searchEmailFromDataBase(Email, handleShowNewPassword);
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
          show={showNewNewPassword}
          style={{ background: "rgba(0, 0, 0, 0.9)" }}
        >
            
          <InputNewData />
          
        </Modal>
      </div>
    </>
  );
}


export default ForgetPassword;