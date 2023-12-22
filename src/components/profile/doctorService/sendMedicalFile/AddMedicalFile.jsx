import React, { useState } from "react";
import "./sendMedicalFile.css";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap-icons/font/bootstrap-icons.css";
import { checkInputFileDoctor } from "../function/DoctorFunctionService";



//here component Add Medical File User , doctor add a file to user,and user can see how much pay need and see what doctor write and document = this component use in profile doctor
function AddMedicalFileUser(props) {


  const [File_user, setFile_user] = useState("");
  const [textDoctor, setTextDoctor] = useState("");
  const [priceSevice, setPriceSevice] = useState("");

  let date = JSON.parse(sessionStorage.getItem("userDateMedical"));
  let storedTheme = localStorage.getItem("theme");



  const checkInputAndSendFile = () => {

    let inputValue = {
      File_user: File_user,
      textDoctor: textDoctor,
      priceSevice: priceSevice,
    };

    checkInputFileDoctor(inputValue);
  };



  return (
    <div
      className={
        storedTheme === "light"
          ? "modelPopUpSendFilePayToUserDark"
          : storedTheme === "dark"
          ? "modelPopUpSendFilePayToUser"
          : ""
      }
    >
      <div className="closeModelSendFilePayToUser">
        <Button
          style={
            storedTheme === "light"
              ? { background: "#424242" }
              : storedTheme === "dark"
              ? { background: "white" }
              : ""
          }
          variant="secondary"
          onClick={props.hideModelMedicalFile}
        >
          <i
            style={
              storedTheme === "light"
                ? { fontSize: "20px", color: "white" }
                : storedTheme === "dark"
                ? { fontSize: "20px", color: "black" }
                : ""
            }
            class="bi bi-x-lg"
          ></i>
        </Button>
      </div>

      <div className="titleFileUser">
        <h1
          style={
            storedTheme === "light"
              ? { color: "#ffffffab" }
              : storedTheme === "dark"
              ? { color: "gray" }
              : ""
          }
        >
          Medical File 📁 {date.FirstName}
        </h1>
      </div>

      <div
        className={
          storedTheme === "light"
            ? "inputMedicalDateDark"
            : storedTheme === "dark"
            ? "inputMedicalDate"
            : ""
        }
      >
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Patient review"
            value={textDoctor}
            onChange={(event) => setTextDoctor(event.target.value)}
            autoFocus
            style={
              storedTheme === "light"
                ? { color: "#ffffffab" }
                : storedTheme === "dark"
                ? { color: "gray" }
                : ""
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="price Service"
            value={priceSevice}
            onChange={(event) => setPriceSevice(event.target.value)}
            style={
              storedTheme === "light"
                ? { color: "#ffffffab" }
                : storedTheme === "dark"
                ? { color: "gray" }
                : ""
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="add link file"
            value={File_user}
            onChange={(event) => setFile_user(event.target.value)}
            style={
              storedTheme === "light"
                ? { color: "#ffffffab" }
                : storedTheme === "dark"
                ? { color: "gray" }
                : ""
            }
          />
        </Form.Group>

        <div className="styleButtonPosition">
          <Button variant="success" onClick={checkInputAndSendFile}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}


export default AddMedicalFileUser;