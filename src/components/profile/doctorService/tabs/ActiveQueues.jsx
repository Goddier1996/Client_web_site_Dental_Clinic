import React, { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import AddMedicalFileUser from "../sendMedicalFile/AddMedicalFile";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  showPopUpTodayDoctorCantSendFile,
  returnBoolResultIfDayTurnToday,
} from "../function/DoctorFunctionService";
import AllUsersNeedSendFile from "../sendMedicalFile/AllUsersNeedSendFile";
import { ShowModelPopUp } from "../../../../customHook/showPopUp";
import MessageNotHaveTurn from "./showMessage/MessageNotHaveTurn";



const ActiveQueues = ({ usersActive_queues }) => {


  // show popup send file custom Hook
  const { show, handleClose, handleShow } = ShowModelPopUp();

  const [saveDataUserSendFile, setSaveDataUserSendFile] = useState({});

  let CountClient = 1;
  let storedTheme = localStorage.getItem("theme");


  // here check function , check if day this today don't show popUp send file, if no show popUp and save dataUser
  const checkFuncIfDoctorCanSendToday = (dataShowAllUsers) => {
    if (!returnBoolResultIfDayTurnToday(dataShowAllUsers)) {
      showPopUpTodayDoctorCantSendFile(dataShowAllUsers);
    } else {
      setSaveDataUserSendFile(dataShowAllUsers);
      // show popup send file
      handleShow();
    }
  };


  return (
    <>
      {usersActive_queues.length ? (
        <Table
          striped
          bordered
          hover
          size="sm"
          variant={
            storedTheme === "light" ? "dark" : storedTheme === "dark" ? "" : ""
          }
        >
          <thead>
            <tr>
              <th style={{ width: "1%", textAlign: "center" }}>#</th>
              <th style={{ width: "8%", textAlign: "center" }}>Name client</th>
              <th style={{ width: "10%", textAlign: "center" }}>Email</th>
              <th style={{ width: "5%", textAlign: "center" }}>Day</th>
              <th style={{ width: "5%", textAlign: "center" }}>Hour</th>
              <th style={{ width: "5%", textAlign: "center" }}>Medical FIle</th>
            </tr>
          </thead>

          {usersActive_queues.map((user) => (
            <tbody key={user._id} className="viewDateUser">
              <AllUsersNeedSendFile
                dataShowAllUsers={user}
                CountClient={CountClient++}
                updateDayHour={checkFuncIfDoctorCanSendToday}
              />
            </tbody>
          ))}
        </Table>
      ) : (
        <MessageNotHaveTurn />
      )}

      
      {/* here show model input value to send file */}
      <Modal show={show}>
        <AddMedicalFileUser
          hideModelMedicalFile={() => handleClose()}
          showDataUser={saveDataUserSendFile}
        />
      </Modal>
    </>
  );
};


export default ActiveQueues;