import React, { useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import "./forgetPassword.css";
import {
  closePopUpForgetPassword,
  searchEmailFromDataBase,
} from "../function/UserForgetPassword";
import InputNewData from "./InputNewData";
import { ShowModelPopUp } from "../../../customHook/showPopUp";
import LazyLoadImg from "../../tools/lazyLoad/LazyLoadImg";



function ForgetPassword({ showModelForgetPassword }) {


  // show popup New Password custom Hook
  const { show, handleShow } = ShowModelPopUp();

  const [Email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const checkEmailInput = () => {
    setLoading(true);
    searchEmailFromDataBase(Email, handleShow, setLoading);
  };



  return (
    <>
      <Modal
        show={showModelForgetPassword}
        style={{ background: "rgba(0, 0, 0, 0.80)" }}
      >
        <Modal.Header className="titleHeaterForgetPassword">
          <Modal.Title>
            <LazyLoadImg
              type=""
              img="https://i.postimg.cc/HxHNBGLG/forgot-password.png"
              width=""
              height=""
              alt="user forget password"
            />
            <h1>You forget a Password ? Let's create new</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="enterEmail">
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter your Email"
                  value={Email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoFocus
                />

                <div className="startChangePassword">
                  {!loading ? (
                    <Button
                      variant="success"
                      disabled={loading}
                      onClick={checkEmailInput}
                    >
                      Ok
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

                  <Button variant="danger" onClick={closePopUpForgetPassword}>
                    Close
                  </Button>
                </div>
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* here show popup, input new value */}
      <InputNewData showModelChangePassword={show} />
    </>
  );
}


export default ForgetPassword;