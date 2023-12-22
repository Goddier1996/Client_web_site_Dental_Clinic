import React, { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import AddMedicalFileUser from "../sendMedicalFile/AddMedicalFile";
import Button from "react-bootstrap/Button";
import "bootstrap-icons/font/bootstrap-icons.css";
import { updateDayHourClinic } from "../function/DoctorFunctionService";


const ActiveQueues = ({ usersActive_queues }) => {


  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  let CountClient = 1;
  let storedTheme = localStorage.getItem("theme");

    
  //update day and hour to null in user + active the hour to anther users can add , at end show popup Doctor send date Medical File to User
  const updateDayHour = (User_code, FirstName, Email, codeHour, Day) => {
    
    let data = {
      User_code: User_code,
      FirstName: FirstName,
      Email: Email,
      codeHour: codeHour,
      Day: Day,
    };

    updateDayHourClinic(data, () => handleShow());
  };

    
  const hideModelMedicalFile = () => {
    
    sessionStorage.removeItem("userDateMedical");
    window.location.reload(false);
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
            <tr>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                {CountClient++}
              </td>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                {user.FirstName}
              </td>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                {user.Email}
              </td>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                {user.Day_date}
              </td>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                {user.Hour_day}
              </td>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                <Button
                  variant="success"
                  onClick={() =>
                    updateDayHour(
                      user._id,
                      user.FirstName,
                      user.Email,
                      user.Serial_codeHour,
                      user.Day_date
                    )
                  }
                >
                  <i class="bi bi-file-earmark-richtext"></i>
                </Button>
              </td>
            </tr>

            <Modal show={show}>
              <AddMedicalFileUser hideModelMedicalFile={hideModelMedicalFile} />
            </Modal>
          </tbody>
        ))}
      </Table>
    </>
  );
};


export default ActiveQueues;