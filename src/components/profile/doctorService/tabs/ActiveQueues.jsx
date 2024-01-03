import React, { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import AddMedicalFileUser from "../sendMedicalFile/AddMedicalFile";
import "bootstrap-icons/font/bootstrap-icons.css";
import { showPopUpTodayDoctorCantSendFile,returnBoolResultIfDayTurnToday } from "../function/DoctorFunctionService";
import AllUsersNeedSendFile from "../sendMedicalFile/AllUsersNeedSendFile";


const ActiveQueues = ({ usersActive_queues }) => {


  // show popUp send file
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [saveDataUserSendFile, setSaveDataUserSendFile] = useState({});

  let CountClient = 1;
  let storedTheme = localStorage.getItem("theme");

    
  // here check function , check if day this today don't show popUp send file, if no show popUp and save dataUser
  const checkFuncIfDoctorCanSendToday = (dataShowAllUsers) => {
    

    if (!returnBoolResultIfDayTurnToday(dataShowAllUsers)) {

      showPopUpTodayDoctorCantSendFile(dataShowAllUsers)
    }

    else {
      setSaveDataUserSendFile(dataShowAllUsers);

      // show popup send file
      handleShow();
    }
  };


  return (
    <>
      <Table
        striped
        bordered
        hover
        size="sm"
        variant={
          storedTheme === "light" ? "dark" : storedTheme === "dark" ? "" : ""
        }>
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
            <AllUsersNeedSendFile dataShowAllUsers={user} CountClient={CountClient++} updateDayHour={checkFuncIfDoctorCanSendToday} />
          </tbody>
        ))}
      </Table>

      {/* here show model input value to send file */}
      <Modal show={show}>
        <AddMedicalFileUser hideModelMedicalFile={()=>setShow()} showDataUser={saveDataUserSendFile } />
      </Modal>
    </>
  );
};


export default ActiveQueues;