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
import MoveContactPageProblem from "./MoveContactPageProblem";



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
      <Modal show={showModelForgetPassword}>
        <div className="stylePasswordModel">
          <div className="titleHeaterForgetPassword">
            <Modal.Title>
              <LazyLoadImg
                type=""
                img="https://i.postimg.cc/prtLMmh6/2.webp"
                width=""
                height=""
                alt="user forget password"
              />
              <h1 style={{ fontSize: "18px" }}>You forget a password ?</h1>
            </Modal.Title>
          </div>
          <Modal.Body>
            <Form>
              <div className="enterEmail">
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Please input your Email"
                    value={Email}
                    onChange={(event) => setEmail(event.target.value)}
                  />

                  <div className="startChangePassword">
                    {!loading ? (
                      <Button
                        variant="success"
                        disabled={loading}
                        onClick={checkEmailInput}
                      >
                        Let's start change
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
                      Exit
                    </Button>
                  </div>
                </Form.Group>
              </div>
            </Form>
          </Modal.Body>

          
          {/* here show if user have problem change password */}
          <div className="contactProblemForgetPassword">
            <MoveContactPageProblem />
          </div>

        </div>
      </Modal>

      {/* here show popup, input new value */}
      <InputNewData showModelChangePassword={show} />
    </>
  );
}


export default ForgetPassword;