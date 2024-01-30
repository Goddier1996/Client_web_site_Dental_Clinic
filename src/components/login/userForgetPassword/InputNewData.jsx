import React, { useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import {
  closePopUpForgetPassword,
  checkValueInput,
} from "../function/UserForgetPassword";
import LazyLoadImg from "../../tools/lazyLoad/LazyLoadImg";



const InputNewData = ({ showModelChangePassword }) => {


  const [User_password, setUser_password] = useState("");
  const [Confirm_password, setConfirm_password] = useState("");
  const [loading, setLoading] = useState(false);

  const checkPasswordInput = () => {
    setLoading(true);
    checkValueInput(User_password, Confirm_password, setLoading);
  };



  return (
    <Modal show={showModelChangePassword}>
      <div className="stylePasswordModelCreateNew">
        <Modal.Header className="titleHeaterNewPassword">
          <Modal.Title>
            <LazyLoadImg
              type=""
              img="https://i.postimg.cc/CKBhZGb2/3.webp"
              width=""
              height=""
              alt="new password"
            />
          </Modal.Title>
        </Modal.Header>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Please Input new password"
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
          {!loading ? (
            <Button
              variant="success"
              disabled={loading}
              onClick={checkPasswordInput}
            >
              Save Changes
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
      </div>
    </Modal>
  );
};


export default InputNewData;