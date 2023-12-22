import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {
  closePopUpForgetPassword,
  checkValueInput,
} from "../function/UserForgetPassword";


const InputNewData = () => {


  const [User_password, setUser_password] = useState("");
  const [Confirm_password, setConfirm_password] = useState("");

    
  return (
    <>
      <Modal.Header>
        <Modal.Title>
          <h1>Input new Password :</h1>
        </Modal.Title>
      </Modal.Header>

      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="enter new password"
          value={User_password}
          onChange={(event) => setUser_password(event.target.value)}
          autoFocus
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="confirm password"
          value={Confirm_password}
          onChange={(event) => setConfirm_password(event.target.value)}
        />
      </Form.Group>

      <div className="startChangePassword">
        <Button variant="success" onClick={checkValueInput}>
          Save Changes
        </Button>

        <Button variant="danger" onClick={closePopUpForgetPassword}>
          Close
        </Button>
      </div>
    </>
  );
};


export default InputNewData;