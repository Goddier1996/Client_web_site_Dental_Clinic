import React from "react";
import "./sendMedicalFile.css";
import { Form, Button, Spinner } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  checkUrlLinkFIle,
  checkInputFileDoctorShowErrorMessage,
} from "../function/DoctorFunctionService";
import { useForm } from "react-hook-form";
import { doctorSendMedicalFile } from "../../../../customHook/customQueryHook";


function AddMedicalFileUser({ hideModelMedicalFile, showDataUser }) {


  let storedTheme = localStorage.getItem("theme");

  // react query
  const { mutate, isLoading: isSendFile } = doctorSendMedicalFile(
    hideModelMedicalFile
  );

  const { register, handleSubmit } = useForm();


  const onSubmitSendFile = (data) => {

    if (!checkUrlLinkFIle(data.File_user)) {

      checkInputFileDoctorShowErrorMessage();
    }
    else {
      let d = new Date();

      let dataUser = {
        textDoctor: data.textDoctor,
        priceSevice: data.priceSevice,
        File_user: data.File_user,
        name: showDataUser.FirstName,
        Publish_by: showDataUser._id,
        email: showDataUser.Email,
        Date_published: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
        IsActive: "1",
        CodeHour: showDataUser.Serial_codeHour,
      };

      mutate(dataUser);
    }
  };


  const onError = (errors) => {
    console.log(errors);
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
          onClick={() => hideModelMedicalFile()}
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
          Medical File 📁 {showDataUser.FirstName}
        </h1>
      </div>

      <Form
        className={
          storedTheme === "light"
            ? "inputMedicalDateDark"
            : storedTheme === "dark"
            ? "inputMedicalDate"
            : ""
        }
        onSubmit={handleSubmit(onSubmitSendFile, onError)}
      >
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Patient review"
            style={
              storedTheme === "light"
                ? { color: "#ffffffab" }
                : storedTheme === "dark"
                ? { color: "gray" }
                : ""
            }
            {...register("textDoctor", {
              required: true,
            })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            placeholder="price Service"
            style={
              storedTheme === "light"
                ? { color: "#ffffffab" }
                : storedTheme === "dark"
                ? { color: "gray" }
                : ""
            }
            {...register("priceSevice", {
              required: true,
              valueAsNumber: true,
            })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="add link file"
            {...register("File_user", {
              required: true,
            })}
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
          {!isSendFile ? (
            <Button variant="success" disabled={isSendFile} type="submit">
              Send
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
        </div>
      </Form>
    </div>
  );
}


export default AddMedicalFileUser;