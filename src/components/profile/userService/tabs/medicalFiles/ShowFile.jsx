import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal, Button } from "react-bootstrap";
import PayService from "./payService/PayService";
import { ShowModelPopUp } from "../../../../../customHook/showPopUp";
import { showHistoryFile } from "../../function/UserProfileFunction";


const ShowFile = ({ dataFile, countFiles }) => {


  // show popup pay service custom Hook
  const { show, handleClose, handleShow } = ShowModelPopUp();

  return (
    <>
      <>
        <tr>
          <td style={{ textAlign: "center", fontSize: "14px" }}>
            {countFiles}
          </td>
          <td style={{ textAlign: "center", fontSize: "14px" }}>
            {dataFile.Date_published}
          </td>
          <td style={{ textAlign: "center", fontSize: "14px" }}>
            {dataFile.textDoctor}
          </td>
          <td style={{ textAlign: "center", fontSize: "14px" }}>
            {dataFile.priceSevice} $
          </td>

          <td style={{ textAlign: "center", fontSize: "14px" }}>
            <Button
              variant="secondary"
              onClick={() => showHistoryFile(dataFile.File_user)}
            >
              <i className="bi bi-file-earmark-richtext"></i>
            </Button>
          </td>

          <td style={{ textAlign: "center", fontSize: "14px" }}>
            <Button variant="success" onClick={() => handleShow()}>
              <i className="bi bi-credit-card"></i>
            </Button>
          </td>
        </tr>
      </>

      <Modal show={show}>
        <PayService dataUserPay={dataFile} closePopUp={() => handleClose()} />
      </Modal>
    </>
  );
};


export default ShowFile;